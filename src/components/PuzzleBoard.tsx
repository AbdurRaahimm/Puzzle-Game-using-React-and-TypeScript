import React from 'react';
import PuzzleTile from './PuzzleTile';

interface PuzzleBoardProps {
  tiles: (number | null)[];
  gridSize: number;
  onTileClick: (index: number) => void;
  isComplete: boolean;
  imageUrl: string;
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ tiles, gridSize, onTileClick, isComplete, imageUrl }) => {
  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        width: '300px',
        height: '300px',
      }}
    >
      {tiles.map((tile, index) => (
        <PuzzleTile
          key={index}
          value={tile}
          onClick={() => onTileClick(index)}
          isComplete={isComplete}
          imageUrl={imageUrl}
          gridSize={gridSize}
        />
      ))}
    </div>
  );
};

export default PuzzleBoard;