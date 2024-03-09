import request from 'supertest';
import app from '../server';

describe('User Registration and Login', () => {
  let api;

  beforeAll(async () => {
    api = request(app);
  });

  it('should register a new user', async () => {
    const res = await api.post('/register').send({
      username: 'testuser',
      password: 'testpassword',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  it('should login with registered user', async () => {
    const res = await api.post('/login').send({
      username: 'testuser',
      password: 'testpassword',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'testuser');
  });
});