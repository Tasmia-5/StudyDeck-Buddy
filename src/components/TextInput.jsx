import { useState } from 'react';

function TextInput({ setFlashcards }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(5);
  const [subject, setSubject] = useState('General');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, amount, subject }),
      });

      const data = await response.json();
      setFlashcards(data.flashcards || []);
    } catch (error) {
      console.error('❌ Frontend fetch error:', error);
      alert('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <textarea
        rows={8}
        className="w-full p-3 border border-gray-300 rounded"
        placeholder="Paste your class notes or textbook text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      <div className="flex gap-4 items-center">
        <label className="text-white font-medium"># of Flashcards:</label>
        <select
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="p-2 rounded border border-gray-300"
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>

        <label className="text-white font-medium">Subject:</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="p-2 rounded border border-gray-300"
        >
          <option value="General">General</option>
          <option value="Cryptography">Cryptography</option>
          <option value="Biology">Biology</option>
          <option value="History">History</option>
          <option value="Computer Science">Computer Science</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Flashcards'}
      </button>
    </form>
  );
}

export default TextInput;
