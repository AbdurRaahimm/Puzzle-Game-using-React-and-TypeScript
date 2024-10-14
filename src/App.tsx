import  { useState, useEffect } from 'react';
import PuzzleBoard from './components/PuzzleBoard';
import { shuffleArray } from './utils/shuffleArray';
import { Image as LucideImage } from 'lucide-react';

const GRID_SIZE = 3;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;
const IMAGE_URL = 'https://source.unsplash.com/featured/600x600?nature,landscape';
const LOADING_TIMEOUT = 5000; // 5 seconds

function App() {
  const [tiles, setTiles] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();
    const timeoutId = setTimeout(() => {
      if (!imageLoaded) {
        setImageError(true);
        initializePuzzle();
      }
    }, LOADING_TIMEOUT);

    img.onload = () => {
      clearTimeout(timeoutId);
      setImageLoaded(true);
      initializePuzzle();
    };

    img.onerror = () => {
      clearTimeout(timeoutId);
      setImageError(true);
      initializePuzzle();
    };

    img.src = IMAGE_URL;

    return () => clearTimeout(timeoutId);
  }, []);

  const initializePuzzle = () => {
    const newTiles = shuffleArray([...Array(TOTAL_TILES - 1).keys(), null]);
    setTiles(newTiles);
    setIsComplete(false);
  };

  const handleTileClick = (index: number) => {
    if (isComplete) return;

    const emptyIndex = tiles.indexOf(null);
    if (isAdjacent(index, emptyIndex)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      checkCompletion(newTiles);
    }
  };

  const isAdjacent = (index1: number, index2: number) => {
    const row1 = Math.floor(index1 / GRID_SIZE);
    const col1 = index1 % GRID_SIZE;
    const row2 = Math.floor(index2 / GRID_SIZE);
    const col2 = index2 % GRID_SIZE;
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  };

  const checkCompletion = (currentTiles: number[]) => {
    const isComplete = currentTiles.every((tile, index) => 
      tile === null ? index === TOTAL_TILES - 1 : tile === index
    );
    setIsComplete(isComplete);
  };

  if (!imageLoaded && !imageError) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Puzzle Game</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={initializePuzzle}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            New Game
          </button>
          <div className="flex items-center">
            <LucideImage className="mr-2" />
            <span className="text-sm">Visual hint</span>
          </div>
        </div>
        <PuzzleBoard
          tiles={tiles}
          gridSize={GRID_SIZE}
          onTileClick={handleTileClick}
          isComplete={isComplete}
          imageUrl={imageError ? '' : IMAGE_URL}
        />
        {isComplete && (
          <div className="mt-4 text-center text-green-600 font-bold">
            Congratulations! Puzzle completed!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;