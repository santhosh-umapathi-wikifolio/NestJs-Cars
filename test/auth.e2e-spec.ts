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

  it('/auth/signup - should signup successfully', () => {
    const testEmail = 'test@test.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: testEmail, password: 'Password11111@asdaPPPPasdasdawasd' })
      .expect(201).then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toBe(testEmail);
      });
  });

  it('auth/signup - should return user correctly', async () => {
    const testEmail = 'test2@test.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: testEmail, password: 'Password11111@asdaPPPPasdasdawasd' })
      .expect(201);

    const { id, email } = res.body;
    const cookie = res.get('Set-Cookie');

    const userRes = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie as string[])
      .expect(200);
    const { email: whoamiEmail, id: whoamiId } = userRes.body;

    expect(whoamiId).toBe(id);
    expect(whoamiEmail).toBe(email);
  });

});