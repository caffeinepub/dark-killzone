import { Button } from '@/components/ui/button';

interface HeroProps {
  onStartGame: () => void;
}

function Hero({ onStartGame }: HeroProps) {
  return (
    <div className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)' }}
      />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-dark" />
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4">
        <h2 className="hero-title text-6xl md:text-7xl font-bold text-white glow-text-danger animate-pulse-scale">
          ENTER THE BATTLE
        </h2>
        <Button
          onClick={onStartGame}
          size="lg"
          className="play-button bg-danger hover:bg-danger/90 text-white font-bold text-xl px-12 py-6 rounded-lg transition-all duration-300 hover:scale-110 glow-danger"
        >
          START GAME
        </Button>
      </div>
    </div>
  );
}

export default Hero;
