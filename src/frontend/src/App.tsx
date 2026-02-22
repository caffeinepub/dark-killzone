import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import GameCanvas from './components/GameCanvas';
import Footer from './components/Footer';

function App() {
  const [gameActive, setGameActive] = useState(false);

  const handleStartGame = () => {
    setGameActive(true);
  };

  const handleBackToMenu = () => {
    setGameActive(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {!gameActive ? (
          <Hero onStartGame={handleStartGame} />
        ) : (
          <GameCanvas onBackToMenu={handleBackToMenu} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
