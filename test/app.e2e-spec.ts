import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/lepaya-courses/ with valid id (GET) should return 200', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/lepaya-courses/ef131a0c-3006-4a38-8cfd-085fa08f8361',
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('date');
    expect(response.body).toHaveProperty('trainer');
    expect(response.body).toHaveProperty('learners');
  });
  it('/api/lepaya-courses/ with invalid id (GET) should return 404 and error message', async () => {
    const invalidId = 'invalidId123';
    const res = await request(app.getHttpServer()).get(
      `/api/lepaya-courses/${invalidId}`,
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual(`Resource with ID ${invalidId} not found`);
  });
});
