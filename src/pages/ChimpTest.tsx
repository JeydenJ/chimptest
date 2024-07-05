import React, { useState, useEffect } from 'react';

interface Button {
  number: number;
  hidden: boolean;
}

const ChimpTest: React.FC = () => {
  const [score, setScore] = useState(0);
  const [buttons, setButtons] = useState<Button[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstCorrectPressed, setIsFirstCorrectPressed] = useState(false);

  useEffect(() => {
    // Initialize the test with a few buttons
    setButtons(generateButtons());
  }, []);

  const generateButtons = (): Button[] => {
    // Generate an array of numbers in random order, e.g., [1, 2, 3]
    const buttonNumbers = [1, 2, 3, 4, 5, 6, 7]; // You can increase the range for more difficulty
    return buttonNumbers
      .sort(() => Math.random() - 0.5)
      .map((number) => ({ number, hidden: false }));
  };

  const handleButtonClick = (number: number) => {
    if (number === currentIndex + 1) {
      if (currentIndex === 0) {
        setIsFirstCorrectPressed(true);
      }
      const newButtons = buttons.map((button) =>
        button.number === number ? { ...button, hidden: true } : button
      );
      setButtons(newButtons);
      setCurrentIndex(currentIndex + 1);

      if (newButtons.every((button) => button.hidden)) {
        // All buttons pressed correctly
        setScore(score + 1);
        setCurrentIndex(0);
        setButtons(generateButtons());
        setIsFirstCorrectPressed(false);
      }
    } else {
      // Incorrect button pressed, reset the test
      setCurrentIndex(0);
      setButtons(generateButtons());
      setIsFirstCorrectPressed(false);
    }
  };

  return (
    <div>
      <header>
        <h1>ChimpTest</h1>
      </header>
      <main>
        <section>
          <h2>Test</h2>
          <div>
            {buttons.map(({ number, hidden }) => (
              <button
                key={number}
                onClick={() => handleButtonClick(number)}
                style={{ visibility: hidden ? 'hidden' : 'visible' }}
              >
                {isFirstCorrectPressed ? '' : number}
              </button>
            ))}
          </div>
        </section>
        <aside>
          <p>Score: {score}</p>
        </aside>
      </main>
    </div>
  );
};

export default ChimpTest;
