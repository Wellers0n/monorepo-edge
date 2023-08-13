import { Client } from 'pg';
import { execSync } from 'child_process';
import { Prisma, PrismaClient } from '@prisma/client';

let client

beforeAll(async () => {
  process.env.DATABASE_URL = process.env.DATABASE_TEST_URL;
  global.process.env.DATABASE_URL = process.env.DATABASE_TEST_URL;

  execSync(
    `export DATABASE_URL=${process.env.DATABASE_TEST_URL} && npx prisma migrate deploy`,
    { stdio: 'inherit' },
  );

  client = new Client({
    connectionString: process.env.DATABASE_TEST_URL,
  });
  await client.connect();
});

beforeEach(async () => {
  await client.query(`DROP SCHEMA IF EXISTS "test" CASCADE;`);
  
  execSync(
    `export DATABASE_URL=${process.env.DATABASE_TEST_URL} && npx prisma migrate deploy`,
    { stdio: 'inherit' },
  );
  // await client.query(`CREATE SCHEMA test;`);

  
});

afterAll(async () => {
  // const client = new Client({
  //   connectionString: process.env.DATABASE_TEST_URL,
  // });

  
  await client.query(`DROP SCHEMA IF EXISTS "test" CASCADE`);
  await client.end();
});
