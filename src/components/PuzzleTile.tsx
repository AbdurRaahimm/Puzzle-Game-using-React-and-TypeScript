import React from 'react';

interface PuzzleTileProps {
  value: number | null;
  onClick: () => void;
  isComplete: boolean;
  imageUrl: string;
  gridSize: number;
}

const PuzzleTile: React.FC<PuzzleTileProps> = ({ value, onClick, isComplete, imageUrl, gridSize }) => {
  if (value === null) {
    return <div className="bg-gray-200 rounded" />;
  }

  const size = 100 / gridSize;
  const x = (value % gridSize) * size;
  const y = Math.floor(value / gridSize) * size;

  const tileStyle = imageUrl
    ? {
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: `-${x}% -${y}%`,
        backgroundSize: `${gridSize * 100}%`,
      }
    : {
        backgroundColor: `hsl(${value * 25}, 70%, 60%)`,
      };

  return (
    <button
      onClick={onClick}
      disabled={isComplete}
      className="w-full h-full bg-cover bg-no-repeat rounded overflow-hidden transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center text-white font-bold text-2xl"
      style={tileStyle}
    >
      {!imageUrl && <span>{value + 1}</span>}
      <span className="sr-only">Tile {value + 1}</span>
    </button>
  );
};

export default PuzzleTile;