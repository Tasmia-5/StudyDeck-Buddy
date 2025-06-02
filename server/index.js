import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/generate', async (req, res) => {
  console.log('📥 Request received from frontend');

  const { text, amount, subject } = req.body;

  try {
    const prompt = `
You are a helpful tutor. Generate ${amount} educational flashcards on the subject of "${subject}" based on the following text.
Each flashcard should be a JSON object with a "question" and an "answer" field.

Example format:
[
  { "question": "What is X?", "answer": "X is..." },
  ...
]

Text:
"""${text}"""
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    });

    const content = response.choices[0].message.content.trim();
    console.log('📦 OpenAI raw response:', content);

    let flashcards;
    try {
      flashcards = JSON.parse(content);
    } catch (err) {
      console.error('❌ Failed to parse JSON:', err.message);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    res.json({ flashcards });
  } catch (err) {
    console.error('❌ OpenAI error:', err.message);
    res.status(500).json({ error: 'Something went wrong generating flashcards.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
