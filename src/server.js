const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3002;

let events = [
    {
        id: 1,
        title: 'Rozpoczęcie rekrutacji do Alan Systems',
        date: '2024-04-26',
        description: 'Dostarcznie zadania rekrutacyjnego',
        image: 'https://example.com/image1.jpg',
        eventType: 'Rekrutacja',
        phoneNumber: '720652833',
        email: 'tomaszstoklosa1990@gmail.com',
        location: 'Obwiednia Południowa 22, 44-200 Rybnik'
      },
      {
        id: 2,
        title: 'Dostarczenie rozwiązania',
        date: '2024-04-27',
        description: 'Dostarczenie zadania rekrutacyjnego',
        image: 'https://example.com/image2.jpg',
        eventType: 'Rekrutacja',
        phoneNumber: '720652833',
        email: 'tomaszstoklosa1990@gmail.com',
        location: 'Obwiednia Południowa 22, 44-200 Rybnik'
      }
];
  
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/events', (req, res) => {
    res.json(events);
});

app.get('/event/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    const event = events.find(event => event.id === eventId);

    if (event) {
        res.json(event);
    } else {
        res.status(404).json({ message: 'Wydarzenie nie zostało znalezione' });
    }
});

app.post('/events', (req, res) => {
    const newEvent = req.body; 

    if (!newEvent) {
        res.status(400).send('Brak danych wysłanych w formularzu');
        return;
    }
    events.push(newEvent);
    res.send('Dodano nowe wydarzenie'); 
});

app.listen(PORT, () => {
    console.log(`Serwer uruchomiony na porcie ${PORT}`);
});

module.exports = app;
