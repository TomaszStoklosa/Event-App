const http = require('http');
const request = require('supertest');
const app = require('./server.js');
let server;

beforeAll((done) => {
  server.close(() => {
    console.log('Serwer zatrzymany');
    done();
  });
  server = http.createServer(app);
  server.listen(3002, () => {
    console.log('Serwer uruchomiony na porcie 3002');
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    console.log('Serwer zatrzymany');
    done();
  });
});

describe('Testy endpointów API', () => {
  it('Powinno dodać nowe wydarzenie', async () => {
    const newEvent = {
      id: 1,
      title: 'Nowe wydarzenie',
      date: '2024-04-26',
      description: 'Opis nowego wydarzenia',
      image: 'https://example.com/image.jpg',
      eventType: 'Sport',
      phoneNumber: '123456789',
      email: 'example@example.com',
      location: 'Example Location'
    };

    const response = await request(app)
      .post('/events')
      .send(newEvent);

    expect(response.status).toBe(200);
  });
});
