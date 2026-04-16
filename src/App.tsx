import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Target, Cpu } from 'lucide-react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleScoreChange = useCallback((newScore: number) => {
    setScore(newScore);
    setHighScore((prev) => (newScore > prev ? newScore : prev));
  }, []);

  return (
    <div className="flex h-screen w-full bg-app-bg font-sans selection:bg-neon-cyan/30 text-slate-200 overflow-hidden relative">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[120px]" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-8 relative z-10 transition-all duration-500">
        <div className="relative w-full max-w-3xl aspect-[4/3] max-h-[80vh] flex flex-col items-center justify-center elegant-panel group">
          
          {/* Score Counter (Top Left of Game Section) */}
          <div className="absolute top-8 left-8 flex flex-col z-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-dim mb-1">Current Run</span>
            <span className="text-5xl font-mono font-bold text-neon-lime neon-glow-lime">
              {score.toLocaleString()}
            </span>
          </div>

          {/* High Score (Top Right of Game Section) */}
          <div className="absolute top-8 right-8 flex flex-col items-end z-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-dim mb-1">Peak Signal</span>
            <span className="text-xl font-mono text-slate-400">
              {highScore.toLocaleString()}
            </span>
          </div>

          {/* Game Window */}
          <div className="relative z-10 scale-90 sm:scale-100 transition-transform duration-500">
            <SnakeGame onScoreChange={handleScoreChange} isPaused={isPaused} />
          </div>

          {/* System Status (Bottom) */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center px-4">
             <div className="flex gap-8">
               <div className="flex flex-col">
                 <span className="text-[9px] font-mono text-text-dim uppercase tracking-widest">Core Load</span>
                 <div className="h-1 w-20 bg-white/5 rounded-full mt-1 overflow-hidden">
                    <motion.div animate={{ width: '84%' }} className="h-full bg-neon-cyan/50" />
                 </div>
               </div>
               <div className="flex flex-col">
                 <span className="text-[9px] font-mono text-text-dim uppercase tracking-widest">Signal</span>
                 <span className="text-xs font-mono text-neon-magenta mt-1">SECURED.0x4</span>
               </div>
             </div>

             <button 
              onClick={() => setIsPaused(!isPaused)}
              className="px-4 py-2 rounded-full font-mono text-[9px] border border-white/5 bg-white/2 hover:bg-white/10 transition-all uppercase tracking-[0.2em] text-text-dim hover:text-white"
            >
              {isPaused ? '[ Resume ]' : '[ Suspend ]'}
            </button>
          </div>
        </div>
      </main>

      {/* Sidebar: Music Player */}
      <MusicPlayer />
    </div>
  );
}
