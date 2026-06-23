import { z } from 'zod';

const booleanString = z
  .enum(['true', 'false'])
  .default('false')
  .transform((value) => value === 'true');

const optionalUrl = z
  .string()
  .url()
  .optional()
  .or(z.literal('').transform(() => undefined));

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().min(1).optional(),
  AUTH_SECRET: z.string().min(32).optional(),
  AUTH_URL: optionalUrl,
  NEXTAUTH_URL: optionalUrl,
  ADMIN_DEV_EMAIL: z.string().email().optional(),
  ADMIN_DEV_PASSWORD: z.string().min(12).optional(),
  ENABLE_ADMIN_AUTOMATION: booleanString,
  AI_PROVIDER: z.enum(['mock', 'http-json']).default('mock'),
  AI_API_KEY: z.string().min(1).optional(),
  AI_BASE_URL: optionalUrl,
  AI_MODEL: z.string().default('mock-draft-v1'),
  AI_TIMEOUT_MS: z.coerce.number().int().min(1_000).max(60_000).default(15_000),
  AI_MAX_DAILY_REQUESTS: z.coerce.number().int().min(1).max(10_000).default(200),
  EMAIL_PROVIDER: z.enum(['mock', 'resend', 'postmark', 'sendgrid']).default('mock'),
  EMAIL_API_KEY: z.string().min(1).optional(),
  EMAIL_FROM: z.string().email().optional(),
  PAYMENT_PROVIDER: z.enum(['mock', 'stripe', 'paypal']).default('mock'),
  PAYMENT_SECRET_KEY: z.string().min(1).optional(),
  PAYMENT_WEBHOOK_SECRET: z.string().min(1).optional(),
  RPC_URL: optionalUrl,
  DEPLOYER_PRIVATE_KEY: z
    .string()
    .regex(/^0x[0-9a-fA-F]{64}$/)
    .optional(),
  BLOCK_EXPLORER_API_KEY: z.string().min(1).optional(),
  TREASURY_ADDRESS: z
    .string()
    .regex(/^0x[0-9a-fA-F]{40}$/)
    .optional(),
  EXPECTED_CHAIN_ID: z.coerce.number().int().positive().default(11155111),
  APP_BASE_URL: optionalUrl,
  GRANT_SCRAPE_ALLOWED_DOMAINS: z.string().optional(),
  SENTRY_DSN: optionalUrl,
});

const publicEnvSchema = z.object({
  NEXT_PUBLIC_NONPROFIT_CONTRACT_ADDRESS: z
    .string()
    .regex(/^0x[0-9a-fA-F]{40}$/)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  NEXT_PUBLIC_EXPECTED_CHAIN_ID: z.coerce.number().int().positive().default(11155111),
  NEXT_PUBLIC_BLOCK_EXPLORER_URL: z.string().url().default('https://sepolia.etherscan.io'),
  NEXT_PUBLIC_DONATION_EVENT_BLOCK_WINDOW: z.coerce
    .number()
    .int()
    .min(100)
    .max(100_000)
    .default(5_000),
  NEXT_PUBLIC_MAX_DONATION_ETH: z.coerce.number().positive().max(1_000).default(100),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type PublicEnv = z.infer<typeof publicEnvSchema>;

function formatEnvError(error: z.ZodError): string {
  return error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ');
}

export function getServerEnv(): ServerEnv {
  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid server environment: ${formatEnvError(parsed.error)}`);
  }
  return parsed.data;
}

export function getPublicEnv(): PublicEnv {
  const parsed = publicEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid public environment: ${formatEnvError(parsed.error)}`);
  }
  return parsed.data;
}

export function getAllowedGrantDomains(): string[] {
  const value = getServerEnv().GRANT_SCRAPE_ALLOWED_DOMAINS;
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((domain) => domain.trim().toLowerCase())
    .filter(Boolean);
}

export function assertProductionEnv(keys: Array<keyof ServerEnv>): void {
  const env = getServerEnv();
  const missing = keys.filter((key) => {
    const value = env[key];
    return value === undefined || value === '';
  });

  if (missing.length > 0) {
    throw new Error(`Missing required production environment values: ${missing.join(', ')}`);
  }
}
