import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface GameCanvasProps {
  onBackToMenu: () => void;
}

interface Bullet {
  x: number;
  y: number;
}

interface Enemy {
  x: number;
  y: number;
}

function GameCanvas({ onBackToMenu }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerXRef = useRef(250);
  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const animationFrameRef = useRef<number>(0);
  const spawnIntervalRef = useRef<number>(0);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Make canvas focusable
    canvas.tabIndex = 1;
    canvas.focus();

    // Keyboard event handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        playerXRef.current = Math.max(0, playerXRef.current - 20);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        playerXRef.current = Math.min(470, playerXRef.current + 20);
      } else if (e.key === ' ') {
        e.preventDefault();
        bulletsRef.current.push({ x: playerXRef.current, y: 350 });
      }
    };

    // Add event listeners
    canvas.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleKeyDown);

    // Enemy spawning
    const spawnEnemy = () => {
      enemiesRef.current.push({
        x: Math.random() * 470,
        y: 0
      });
    };

    spawnIntervalRef.current = window.setInterval(spawnEnemy, 1000);

    // Game loop
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, 500, 400);

      // Draw player (red square)
      ctx.fillStyle = '#ff003c';
      ctx.fillRect(playerXRef.current, 360, 30, 30);

      // Update and draw bullets
      ctx.fillStyle = '#ffff00';
      bulletsRef.current = bulletsRef.current.filter((bullet) => {
        bullet.y -= 5;
        
        if (bullet.y < 0) return false;
        
        ctx.fillRect(bullet.x + 10, bullet.y, 5, 10);
        return true;
      });

      // Update and draw enemies
      ctx.fillStyle = '#ffffff';
      enemiesRef.current = enemiesRef.current.filter((enemy) => {
        enemy.y += 2;
        
        if (enemy.y > 400) return false;

        // Check collision with bullets
        let hit = false;
        bulletsRef.current = bulletsRef.current.filter((bullet) => {
          if (
            bullet.x < enemy.x + 30 &&
            bullet.x + 5 > enemy.x &&
            bullet.y < enemy.y + 30 &&
            bullet.y + 10 > enemy.y
          ) {
            hit = true;
            scoreRef.current += 10;
            setScore(scoreRef.current);
            return false;
          }
          return true;
        });

        if (hit) return false;

        ctx.fillRect(enemy.x, enemy.y, 30, 30);
        return true;
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    // Start game loop
    draw();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
      }
      canvas.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="game-area min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-radial-dark">
      <div className="space-y-6 text-center">
        <div className="flex items-center justify-between gap-8 mb-4">
          <Button
            onClick={onBackToMenu}
            variant="outline"
            className="border-danger text-danger hover:bg-danger hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
          <div className="text-2xl font-bold text-white glow-text-danger">
            Score: <span className="text-danger">{score}</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white glow-text-danger mb-4">
          Mini Shooter Demo
        </h2>

        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          className="game-canvas bg-[#111] border-2 border-danger rounded-lg shadow-2xl glow-danger mx-auto focus:outline-none focus:ring-2 focus:ring-danger"
        />

        <div className="text-white/70 text-sm space-y-2 max-w-md mx-auto">
          <p className="font-semibold text-white">Controls:</p>
          <div className="grid grid-cols-1 gap-1">
            <p><span className="text-danger">←/→</span> Move left/right</p>
            <p><span className="text-danger">SPACE</span> Shoot</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCanvas;
