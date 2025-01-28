// __tests__/server.test.js
const request = require('supertest');
const app = require('../server'); // Импортируйте Ваш сервер

describe('SecondService API', () => {
  it('should get users from UserService', async () => {
    const token = 'your_jwt_token'; // Замените на реальный токен
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
