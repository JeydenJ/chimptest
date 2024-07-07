import React, { useState, useEffect } from 'react';

interface Button {
  number: number;
  hidden: boolean;
  row: number;
  col: number;
}

const ChimpTest: React.FC = () => {
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [level, setLevel] = useState(4); // Start with 4 buttons
  const [buttons, setButtons] = useState<Button[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstCorrectPressed, setIsFirstCorrectPressed] = useState(false);
  const [lives, setLives] = useState(3); // Initialize with 3 lives

  useEffect(() => {
    // Initialize the test with buttons based on the current level
    setButtons(generateButtons(level));
  }, [level]);

  const generateButtons = (numButtons: number): Button[] => {
    const buttonNumbers = Array.from({ length: numButtons }, (_, i) => i + 1);
    const buttonPositions: { row: number; col: number }[] = [];
    const gridSize = 5;

    while (buttonPositions.length < buttonNumbers.length) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      const positionExists = buttonPositions.some(
        (pos) => pos.row === row && pos.col === col
      );

      if (!positionExists) {
        buttonPositions.push({ row, col });
      }
    }

    return buttonNumbers
      .sort(() => Math.random() - 0.5)
      .map((number, index) => ({
        number,
        hidden: false,
        row: buttonPositions[index].row,
        col: buttonPositions[index].col,
      }));
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
        setCorrectGuesses(correctGuesses + level); // Add correct guesses for this level
        setCurrentIndex(0);
        setLevel(level + 1); // Increase the level
        setButtons(generateButtons(level + 1)); // Generate new buttons for the next level
        setIsFirstCorrectPressed(false);
      }
    } else {
      // Incorrect button pressed
      setLives(lives - 1);
      if (lives - 1 === 0) {
        // No more lives, reset the game
        setCorrectGuesses(0);
        setLevel(4); // Reset to the initial level
        setButtons(generateButtons(4)); // Generate initial buttons
        setIsFirstCorrectPressed(false);
        setLives(3); // Reset lives
      } else {
        // Just reset the buttons and index
        setCurrentIndex(0);
        setButtons(generateButtons(level));
        setIsFirstCorrectPressed(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-blue flex flex-col items-center">
      <header className="py-4">
        <h1 className="text-3xl font-bold text-main-text font-roboto-mono">ChimpTest</h1>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="mb-4">
          <h2 className="text-xl font-semibold text-main-text font-roboto-mono mb-2">Test</h2>
          <div className="border-4 border-main-text p-2 bg-gray-700">
            <div className="grid grid-cols-5 gap-2 w-[300px] h-[300px]">
              {buttons.map(({ number, hidden, row, col }) => (
                <button
                  key={number}
                  onMouseDown={() => handleButtonClick(number)}
                  className={`${
                    hidden ? 'invisible' : 'bg-main-text text-white border-2 border-transparent hover:border-white'
                  } h-12 w-12 text-2xl font-bold font-roboto-mono rounded-md`}
                  style={{
                    gridRow: row + 1,
                    gridColumn: col + 1,
                  }}
                >
                  {isFirstCorrectPressed ? '' : number}
                </button>
              ))}
            </div>
          </div>
        </section>
        <aside className="mt-4">
          <p className="text-xl font-semibold text-main-text font-roboto-mono">Correct Guesses: {correctGuesses}</p>
          <p className="text-xl font-semibold text-main-text font-roboto-mono">Level: {level - 3}</p> {/* Adjust level display */}
          <p className="text-xl font-semibold text-main-text font-roboto-mono">Lives: {lives}</p>
        </aside>
      </main>
    </div>
  );
};

export default ChimpTest;
