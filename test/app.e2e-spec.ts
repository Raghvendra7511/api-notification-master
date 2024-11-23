// test/app.e2e-spec.ts

import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/preferences (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/preferences')
      .send({
        userId: 'test123',
        email: 'test@example.com',
        preferences: {
          marketing: true,
          newsletter: false,
          updates: true,
          frequency: 'weekly',
          channels: {
            email: true,
            sms: false,
            push: true
          }
        },
        timezone: 'America/New_York'
      })
      .expect(201);
  });

  // Add more tests...
});