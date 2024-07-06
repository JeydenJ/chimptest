import React, { useState, useEffect } from 'react';

interface Button {
  number: number;
  hidden: boolean;
  row: number;
  col: number;
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
    const buttonNumbers = [1, 2, 3, 4, 5, 6, 7];
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
    <div className="min-h-screen bg-dark-blue flex flex-col items-center">
      <header className="py-4">
        <h1 className="text-3xl font-bold text-main-text font-roboto-mono">ChimpTest</h1>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="mb-4">
          <h2 className="text-xl font-semibold text-main-text font-roboto-mono mb-2">Test</h2>
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
        </section>
        <aside className="mt-4">
          <p className="text-xl font-semibold text-main-text font-roboto-mono">Score: {score}</p>
        </aside>
      </main>
    </div>
  );
};

export default ChimpTest;
