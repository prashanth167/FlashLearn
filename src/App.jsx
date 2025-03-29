import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputType, setInputType] = useState('text'); // 'text' or 'topic'
  const [inputValue, setInputValue] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateFlashcards = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: inputValue,
          type: inputType,
        }),
      });
      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>FlashLearn MVP</h1>
      
      <div className="input-section">
        <div className="input-type-toggle">
          <button
            className={inputType === 'text' ? 'active' : ''}
            onClick={() => setInputType('text')}
          >
            Notes/Documents
          </button>
          <button
            className={inputType === 'topic' ? 'active' : ''}
            onClick={() => setInputType('topic')}
          >
            Topic
          </button>
        </div>
        {inputType === 'text' ? (
          <textarea
            placeholder="Paste your notes or document text here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows={10}
          />
        ) : (
          <input
            type="text"
            placeholder="Enter a topic (e.g., Photosynthesis, World War II)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
        <button onClick={generateFlashcards} disabled={loading || !inputValue}>
          {loading ? 'Generating...' : 'Generate Flashcards'}
        </button>
      </div>

      <div className="flashcards-section">
        {flashcards.length > 0 && <h2>Generated Flashcards:</h2>}
        <div className="flashcards-container">
          {flashcards.map((card, index) => (
            <div key={index} className="flashcard">
              <div className="flashcard-inner">
                <div className="flashcard-front">
                  <p className="flashcard-text"><strong>Q:</strong> {card.question}</p>
                </div>
                <div className="flashcard-back">
                  <p className="flashcard-text"><strong>A:</strong> {card.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
