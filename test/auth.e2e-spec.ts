import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('Authentication (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup', () => {
    const testEmail = 'test222@test.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: testEmail, password: 'password' })
      .expect(201).then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toBe(testEmail);
      });
  });
});
