import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';

describe('Assignors (e2e)', () => {
  let app: INestApplication;

  let token;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
      });

      await request(app.getHttpServer())
      .post('/assignors/create')
      .set('Authorization', `Bearer ${response.body.access_token}`)
      .send({
        email: 'test@admin.com',
        name: 'test',
        document: '00000000000',
        phone: '00000000000',
      });

    token = response.body.access_token;
  });

  it('/assignors/:id (DELETE) not authorized', async () => {
    const response = await request(app.getHttpServer()).delete('/assignors/1');

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  it('/assignors/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .get('/assignors')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);

    await request(app.getHttpServer())
      .delete('/assignors/1')
      .set('Authorization', `Bearer ${token}`);

    const responseAfterDelete = await request(app.getHttpServer())
      .get('/assignors')
      .set('Authorization', `Bearer ${token}`);

    expect(responseAfterDelete.statusCode).toBe(200);
    expect(responseAfterDelete.body).toHaveLength(0);
  });
});
