
const request = require('supertest');
const app = require('./server.js');
const { exec } = require('child_process');

afterAll(() => {
  const command = 'netstat -a -n -o | findstr :3002 | findstr LISTENING | for /f "tokens=5" %a in (\'findstr :3002\') do taskkill /pid %a /f';
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Błąd podczas zatrzymywania serwera: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Błąd standardowego wyjścia: ${stderr}`);
      return;
    }
    console.log(`Serwer został zatrzymany: ${stdout}`);
  });
});

describe('Test endpointu GET /events', () => {
  it('Powinno zwrócić listę wydarzeń', async () => {
    const response = await request(app).get('/events');
    
    expect(response.status).toBe(200); 
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        date: expect.any(String),
        description: expect.any(String),
        image: expect.any(String),
        eventType: expect.any(String),
        phoneNumber: expect.any(String),
        email: expect.any(String),
        location: expect.any(String)
      })
    ]));
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
