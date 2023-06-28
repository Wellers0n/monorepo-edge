import { Client } from 'pg';
import { execSync } from 'child_process';

beforeAll(async () => {
  process.env.DATABASE_URL = process.env.DATABASE_TEST_URL;
  global.process.env.DATABASE_URL = process.env.DATABASE_TEST_URL;

  execSync(
    `export DATABASE_URL=${process.env.DATABASE_TEST_URL} && npx prisma migrate deploy`,
    { stdio: 'inherit' },
  );
});

beforeEach(async () => {
  execSync(
    `export DATABASE_URL=${process.env.DATABASE_TEST_URL} && npx prisma migrate reset -f`,
    { stdio: 'inherit' },
  );
});

afterAll(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_TEST_URL,
  });

  await client.connect();
  await client.query(`DROP SCHEMA IF EXISTS "test" CASCADE`);
  await client.end();
});
