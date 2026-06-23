import hre from 'hardhat';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required.`);
  }
  return value;
}

async function main() {
  await hre.run('verify:verify', {
    address: requireEnv('CONTRACT_ADDRESS'),
    constructorArguments: [requireEnv('TREASURY_ADDRESS')],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
