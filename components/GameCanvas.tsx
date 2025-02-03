"use client";

import {
  canvasFallbackText,
  DESKTOP_CANVAS_HEIGHT,
  DESKTOP_CANVAS_WIDTH,
  eatingSrc,
  gameOverSrc,
  gameOverText,
  gameStartSrc,
  MOBILE_CANVAS_HEIGHT,
  MOBILE_CANVAS_WIDTH,
  pauseButtonText,
  resetButtonText,
  restartButtonText,
  resumeButtonText,
  scoreText,
  startButtonText,
} from "@/constants";
import { detectSelfCollision, generateRandomSquare } from "@/lib/utils";
import { SnakeState } from "@/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { saveHighScore } from "@/actions/highscore";
import { useAuth } from "@/hooks/use-auth";
// import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";

const GameCanvas = () => {
  // Canvas width and height
  const [canvasWidth, setCanvasWidth] = useState(MOBILE_CANVAS_WIDTH);
  const [canvasHeight, setCanvasHeight] = useState(MOBILE_CANVAS_HEIGHT);
  useEffect(() => {
    const resizeCanvas = () => {
      setCanvasWidth(
        window.innerWidth > 768 ? DESKTOP_CANVAS_WIDTH : MOBILE_CANVAS_WIDTH
      );
      setCanvasHeight(
        window.innerWidth > 768 ? DESKTOP_CANVAS_HEIGHT : MOBILE_CANVAS_HEIGHT
      );
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);
  // current user
  const user = useAuth();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridSize = 20; // Snake moves in 20x20 grid cells
  // Get the current URL query parameters
  const searchParams = useSearchParams();
  // Audio files refs
  const eatSound = useRef<HTMLAudioElement | null>(null);
  const gameOverSound = useRef<HTMLAudioElement | null>(null);
  const gameStartSound = useRef<HTMLAudioElement | null>(null);
  // Load audio files
  useEffect(() => {
    eatSound.current = new Audio(eatingSrc);
    gameOverSound.current = new Audio(gameOverSrc);
    gameStartSound.current = new Audio(gameStartSrc);
  }, []);

  // Initial snake state, memoized to avoid unnecessary re-renders
  const initialSnake = useMemo(
    () => [
      { x: 200, y: 200 },
      { x: 220, y: 200 },
    ],
    []
  );
  // Snake state: an array of { x, y } positions
  const [snake, setSnake] = useState<SnakeState[]>(initialSnake);
  // Movement direction state: either left, right, up, down or none
  const [direction, setDirection] = useState<SnakeState>({
    x: 0,
    y: 0,
  });

  //   Game state
  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState<number>(0);
  // Food state
  const [food, setFood] = useState<SnakeState | null>(null);
  // Difficulty level
  const [difficultyLevel, setDifficultyLevel] = useState<number>(100);
  //   Handle difficulty level change
  useEffect(() => {
    //   Get the initial difficulty level from the URL query parameters, default to "1" if not found
    const initialDifficulty = searchParams.get("difficulty") ?? "1";
    switch (initialDifficulty) {
      case "1":
        setDifficultyLevel(100);
        break;
      case "2":
        setDifficultyLevel(70);
        break;
      case "3":
        setDifficultyLevel(50);
        break;
      case "4":
        setDifficultyLevel(40);
        break;
      case "5":
        setDifficultyLevel(30);
        break;
      default:
        setDifficultyLevel(100);
    }
  }, [searchParams]);
  const [muted, setMuted] = useState<boolean>(false);
  // Check if the mute parameter is in the URL query parameters
  useEffect(() => {
    setMuted(
      searchParams.get("mute")
        ? parseInt(searchParams.get("mute")!) === 1
        : false
    );
  }, [searchParams]);
  // Mute sound effects
  useEffect(() => {
    if (muted) {
      if (gameStartSound.current) gameStartSound.current.muted = true;
      if (gameOverSound.current) gameOverSound.current.muted = true;
      if (eatSound.current) eatSound.current.muted = true;
    } else {
      if (gameStartSound.current) gameStartSound.current.muted = false;
      if (gameOverSound.current) gameOverSound.current.muted = false;
      if (eatSound.current) eatSound.current.muted = false;
    }
  }, [muted]);
  //   Start the game, function is wrapped in useCallback to prevent unnecessary re-renders in the useEffect hook that handles key presses
  const handleStartGame = useCallback(() => {
    setGameOver(false);
    setIsRunning(true);
    setIsPaused(false);
    setFood(
      generateRandomSquare(canvasWidth - gridSize, canvasHeight - gridSize)
    );
    setSnake(initialSnake);
    setDirection({ x: -gridSize, y: 0 });
    // Play game start sound
    gameStartSound.current?.play();
  }, [initialSnake, canvasHeight, canvasWidth]);
  //   Pause the game
  const handlePauseGame = () => {
    setIsPaused((prev) => !prev);
  };

  //   Reset the game
  const handleResetGame = () => {
    if (!gameOver) setGameOver(true);
    if (isRunning) setIsRunning(false);
    if (isPaused) setIsPaused(false);
    setFood(null);
    setSnake(initialSnake);
    setDirection({ x: 0, y: 0 });
    setScore(0);
  };

  //   Draw everything
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Draw background
    const drawBackground = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Function to draw the grid
    const drawGrid = () => {
      // ctx.strokeStyle = "#333"; // Grid color
      // for (let x = 0; x < canvas.width; x += gridSize) {
      //   for (let y = 0; y < canvas.height; y += gridSize) {
      //     ctx.strokeRect(x, y, gridSize, gridSize);
      //   }
      // }
    };
    // Draw the snake
    const drawSnake = () => {
      ctx.fillStyle = "#00ff00"; // Snake color
      snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
      });
    };
    // Draw the food
    const drawFood = () => {
      if (!food) return;
      ctx.fillStyle = "#ff0000"; // Food color
      //   Check if the food is at the same position as any of the snake segments i.e. eaten
      if (
        snake.some((segment) => segment.x === food.x && segment.y === food.y)
      ) {
        // Play eating sound
        eatSound.current?.play();
        // Generate new food
        setFood(
          generateRandomSquare(canvasWidth - gridSize, canvasHeight - gridSize)
        );

        // Make the snake bigger
        setSnake((prevSnake) => {
          const prevHead = prevSnake[0];
          const newHead = {
            x: prevHead.x + direction.x,
            y: prevHead.y + direction.y,
          };
          //   Check if the snake has collided with the walls
          if (
            newHead.x < 0 ||
            newHead.x >= canvasWidth ||
            newHead.y < 0 ||
            newHead.y >= canvasHeight
          ) {
            setGameOver(true);
            return prevSnake;
          }
          const newSnake: SnakeState[] = [newHead, ...prevSnake];
          // Check if the snake has collided with itself
          if (detectSelfCollision(newSnake)) {
            setGameOver(true);
            return prevSnake;
          }
          return newSnake;
        });
        // Update the score
        setScore((prevScore) => prevScore + 10);
        return;
      }

      // Draw the food
      ctx.fillRect(food.x, food.y, gridSize, gridSize);
    };

    drawBackground();
    drawGrid();
    drawSnake();
    drawFood();
  }, [snake, food, direction, canvasHeight, canvasWidth]);

  // Handle key presses to change direction
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (direction.y === 0) setDirection({ x: 0, y: -gridSize });
          if (!isRunning) handleStartGame();
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (direction.y === 0) setDirection({ x: 0, y: gridSize });
          if (!isRunning) handleStartGame();
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (direction.x === 0) setDirection({ x: -gridSize, y: 0 });
          if (!isRunning) handleStartGame();
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (direction.x === 0) setDirection({ x: gridSize, y: 0 });
          if (!isRunning) handleStartGame();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, isRunning, handleStartGame]);

  //   Move the snake
  useEffect(() => {
    if (!gameOver && isRunning && !isPaused) {
      const interval = setInterval(() => {
        setSnake((prevSnake) => {
          const prevHead = prevSnake[0];
          const newHead = {
            x: prevHead.x + direction.x,
            y: prevHead.y + direction.y,
          };
          //   Check if the snake has collided with itself or the walls
          if (
            newHead.x < 0 ||
            newHead.x >= canvasWidth ||
            newHead.y < 0 ||
            newHead.y >= canvasHeight ||
            prevSnake.includes(newHead)
          ) {
            setGameOver(true);
            return prevSnake;
          }
          const newSnake: SnakeState[] = [newHead, ...prevSnake.slice(0, -1)];
          if (detectSelfCollision(newSnake)) {
            setGameOver(true);
            return prevSnake;
          }
          return newSnake;
        });
      }, difficultyLevel);
      return () => clearInterval(interval);
    }
  }, [
    direction,
    gameOver,
    isRunning,
    isPaused,
    difficultyLevel,
    canvasHeight,
    canvasWidth,
  ]);

  // Handle game over
  useEffect(() => {
    const handleGameOver = async () => {
      if (user) {
        await saveHighScore(user.uid, score);
      }
    };
    if (gameOver) {
      handleGameOver().catch((error) => console.error(error));
      // Play game over sound
      if (isRunning) gameOverSound.current?.play();
    }
  }, [score, user, gameOver, isRunning]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 -order-1 lg:order-0">
      <canvas ref={canvasRef} className="border border-theme-yellow">
        {canvasFallbackText}
      </canvas>
      <div className="flex flex-row gap-4 items-center">
        <span>{`${scoreText}: ${score}`}</span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Button
          className="bg-theme-green hover:bg-theme-green/70 cursor-pointer"
          disabled={isRunning}
          onClick={handleStartGame}
        >
          {startButtonText}
        </Button>
        <Button
          className="bg-theme-yellow hover:bg-theme-yellow/70 cursor-pointer"
          disabled={gameOver}
          onClick={handlePauseGame}
        >
          {!isPaused ? pauseButtonText : resumeButtonText}
        </Button>
        <Button
          className="bg-theme-red hover:bg-theme-red/70 cursor-pointer text-white"
          onClick={handleResetGame}
        >
          {resetButtonText}
        </Button>
      </div>
      {/* Game Over Message */}
      {gameOver && (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-2xl font-bold">{gameOverText}</p>
          <Button
            className="bg-theme-red hover:bg-theme-red/70 cursor-pointer text-white"
            onClick={() => {
              handleResetGame();
              handleStartGame();
            }}
          >
            {restartButtonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameCanvas;
