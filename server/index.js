import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Sample data
const emails = [
  {
    id: '1',
    from: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    subject: 'Weekly Team Meeting',
    shortDescription: 'Discussing project updates and upcoming deadlines',
    dateTime: '2024-03-15T10:00:00Z',
    read: false,
    favorite: false
  },
  {
    id: '2',
    from: {
      name: 'Alice Smith',
      email: 'alice@example.com'
    },
    subject: 'Client Presentation Review',
    shortDescription: 'Please review the attached presentation for tomorrow',
    dateTime: '2024-03-15T09:30:00Z',
    read: true,
    favorite: true
  },
  // Add more sample emails as needed
];

const emailBodies = {
  '1': {
    id: '1',
    body: 'Hello team,\n\nLet\'s meet to discuss our project progress and plan next steps. Please come prepared with your updates.\n\nBest regards,\nJohn'
  },
  '2': {
    id: '2',
    body: 'Hi everyone,\n\nI\'ve prepared the client presentation for tomorrow\'s meeting. Please review and provide your feedback.\n\nThanks,\nAlice'
  }
};

app.get('/api/emails', (req, res) => {
  res.json(emails);
});

app.get('/api/emails/:id/body', (req, res) => {
  const { id } = req.params;
  const emailBody = emailBodies[id];

  if (!emailBody) {
    return res.status(404).json({ error: 'Email body not found' });
  }

  res.json(emailBody);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
