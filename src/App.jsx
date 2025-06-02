import { useState } from 'react';
import TextInput from './components/TextInput';
import FlashcardList from './components/FlashcardList';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [mode, setMode] = useState('quiz'); // or 'flip'

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🧠 StudyDeck Buddy</h1>
      <TextInput setFlashcards={setFlashcards} />

      {Array.isArray(flashcards) && flashcards.length > 0 && (
        <>
          <div className="mb-4">
            <label className="mr-2 font-semibold">Mode:</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="p-2 rounded text-black"
            >
              <option value="quiz">Quiz Mode</option>
              <option value="flip">Flip Mode</option>
            </select>
          </div>

          <FlashcardList flashcards={flashcards} mode={mode} />
        </>
      )}
    </div>
  );
}

export default App;
