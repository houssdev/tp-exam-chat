const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let messages = []; 

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const { author, content } = req.body;
  if (!author || !content) return res.status(400).json({ error: 'author and content required' });
  const msg = { id: Date.now(), author, content, time: new Date().toISOString() };
  messages.push(msg);
  if (messages.length > 200) messages = messages.slice(-200);
  res.status(201).json(msg);
});

app.get('/', (req, res) => res.send('TP Exam Chat - Backend'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
