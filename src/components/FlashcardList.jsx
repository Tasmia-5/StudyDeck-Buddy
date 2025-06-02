import { useState } from 'react';

function FlipCard({ card }) {
    const [flipped, setFlipped] = useState(false);
  
    return (
      <div
        onClick={() => setFlipped(!flipped)}
        className="w-64 h-64 perspective cursor-pointer"
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform ${
            flipped ? 'rotate-y-180' : ''
          } transform-style-preserve-3d`}
        >
          <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-white text-black p-4 rounded-xl shadow-lg text-center">
            <p className="font-semibold text-lg">Q: {card.question}</p>
          </div>
          <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center bg-blue-100 text-black p-4 rounded-xl shadow-lg text-center">
            <p className="text-md">A: {card.answer}</p>
          </div>
        </div>
      </div>
    );
  }
  

function QuizCard({ card, onCorrect, onWrong, showAnswer, setShowAnswer }) {
  return (
    <div className="bg-white text-black p-6 rounded shadow-md max-w-xl mx-auto text-center space-y-4">
      <h2 className="text-xl font-bold text-blue-700">
        {showAnswer ? `A: ${card.answer}` : `Q: ${card.question}`}
      </h2>
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="text-sm text-blue-500 underline"
      >
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </button>
      {showAnswer && (
        <div className="flex justify-center gap-6 mt-4">
          <button
            onClick={onCorrect}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            ✅ Correct
          </button>
          <button
            onClick={onWrong}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            ❌ Wrong
          </button>
        </div>
      )}
    </div>
  );
}

function FlashcardList({ flashcards = [], mode = "quiz" }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [showAnswer, setShowAnswer] = useState(false);

  if (!Array.isArray(flashcards) || flashcards.length === 0) {
    return null;
  }

  if (mode === 'flip') {
    return (
      <div className="grid gap-4">
        {flashcards.map((card, i) => (
          <FlipCard key={i} card={card} />
        ))}
      </div>
    );
  }

  // Quiz mode
  const handleCorrect = () => {
    setScore({ ...score, correct: score.correct + 1 });
    nextCard();
  };

  const handleWrong = () => {
    setScore({ ...score, wrong: score.wrong + 1 });
    nextCard();
  };

  const nextCard = () => {
    setIndex(index + 1);
    setShowAnswer(false);
  };

  if (index >= flashcards.length) {
    return (
      <div className="bg-white text-black p-6 rounded shadow-md max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">Quiz Complete 🎉</h2>
        <p className="text-lg">Correct: {score.correct}</p>
        <p className="text-lg">Wrong: {score.wrong}</p>
        <p className="text-sm mt-2 text-gray-600">Reload page to try again</p>
      </div>
    );
  }

  return (
    <QuizCard
      card={flashcards[index]}
      onCorrect={handleCorrect}
      onWrong={handleWrong}
      showAnswer={showAnswer}
      setShowAnswer={setShowAnswer}
    />
  );
}

export default FlashcardList;
