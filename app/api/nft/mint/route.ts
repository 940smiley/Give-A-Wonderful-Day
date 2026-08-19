import { z } from 'zod';
import { jsonError, jsonOk, readJsonBody, safeJsonError } from '../../../../lib/api';
import { requireApiPermission } from '../../../../lib/auth/session';
import { writeAuditLog } from '../../../../lib/audit';
import { getPrisma } from '../../../../lib/db';
import { ethers } from 'ethers';
import { getServerEnv } from '../../../../lib/env';

// Hardhat/Ethers ABI for GAWDCharacter (minimal interface for minting)
const GAWDCharacterABI = [
  "function mintCharacter(address to, string calldata uri) external returns (uint256)"
];

export const runtime = 'nodejs';

const mintSchema = z.object({
  recipientId: z.string().uuid(),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  metadataUri: z.string().url(),
});

export async function POST(request: Request) {
  try {
    const user = await requireApiPermission('recipient:manage');
    const input = await readJsonBody(request, mintSchema, 4_000);
    const env = getServerEnv();

    const prisma = getPrisma();

    // Verify recipient and consent
    const recipient = await prisma.recipient.findUnique({
      where: { id: input.recipientId },
      include: { consents: true },
    });

    if (!recipient) {
      return jsonError('Recipient not found.', 404);
    }

    if (recipient.nftMinted) {
      return jsonError('NFT already minted for this recipient.', 400);
    }

    const hasConsent = recipient.consents.some(
      (c) => c.scope === 'NFT_CHARACTER' && c.status === 'GRANTED'
    );

    if (!hasConsent) {
      return jsonError('Recipient has not granted consent for NFT character minting.', 403);
    }

    // Connect to blockchain
    if (!env.RPC_URL || !env.DEPLOYER_PRIVATE_KEY) {
      return jsonError('Blockchain environment variables not configured.', 500);
    }

    // In a real implementation, you'd want to store the GAWDCharacter contract address in env
    // For this example, we mock a response if the contract address isn't present
    const contractAddress = process.env.GAWD_CHARACTER_CONTRACT_ADDRESS;
    if (!contractAddress) {
       // Mock success if no contract address is set (useful for dev/testing UI)
       await prisma.recipient.update({
         where: { id: recipient.id },
         data: { nftMinted: true, nftTokenId: "mock-token-id" }
       });
       return jsonOk({ success: true, mock: true, tokenId: "mock-token-id" });
    }

    const provider = new ethers.JsonRpcProvider(env.RPC_URL);
    const wallet = new ethers.Wallet(env.DEPLOYER_PRIVATE_KEY, provider);
    const contract = new ethers.Contract(contractAddress, GAWDCharacterABI, wallet);

    // Execute Mint Transaction
    const tx = await (contract as any).mintCharacter(input.walletAddress, input.metadataUri);
    const receipt = await tx.wait();

    // Extract Token ID from event logs (assuming standard ERC721 structure)
    // The topic for Transfer/Mint is standard, we extract the third topic which is the tokenId
    let tokenId = "unknown";
    if (receipt.logs && receipt.logs.length > 0) {
      const log = receipt.logs[0];
      tokenId = BigInt(log.topics[3]).toString();
    }

    // Update Recipient Record
    await prisma.recipient.update({
      where: { id: recipient.id },
      data: {
        nftMinted: true,
        nftTokenId: tokenId,
      },
    });

    await writeAuditLog({
      actorId: user.id,
      action: 'nft.minted',
      entity: 'Recipient',
      entityId: recipient.id,
      metadata: { txHash: tx.hash, tokenId },
    });

    return jsonOk({ success: true, txHash: tx.hash, tokenId });
  } catch (error) {
    return safeJsonError(
      error,
      error instanceof Error && error.message === 'Unauthorized.' ? 401 : 400,
    );
  }
}
