import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Track {
  title: string;
  artist: string;
  url: string;
  color: string;
}

const TRACKS: Track[] = [
  {
    title: "Quantum Drift",
    artist: "CyberCore.AI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "var(--color-neon-cyan)"
  },
  {
    title: "Synthetic Pulse",
    artist: "SynthRiot",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "var(--color-neon-magenta)"
  },
  {
    title: "Neon Substrate",
    artist: "PulseEmitter",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "var(--color-neon-lime)"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleEnded = () => {
    nextTrack();
  };

  return (
    <div className="w-[300px] h-full flex flex-col bg-panel-bg border-l border-white/5 p-6 backdrop-blur-xl gap-8 shadow-2xl">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="flex flex-col gap-2">
        <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-text-dim flex items-center justify-between border-b border-white/5 pb-2 mb-4">
          <span>System Audio</span>
          <Music size={12} className="text-neon-cyan" />
        </h3>
        <div className="h-56 w-full rounded-lg bg-gradient-to-br from-[#1a1a20] to-[#0a0a0c] border border-white/10 relative overflow-hidden flex items-center justify-center group shadow-inner">
          {/* Conic gradient effect simulation */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[conic-gradient(from_0deg,transparent,#00f3ff,transparent)]" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrackIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="relative z-10 flex flex-col items-center text-center p-4"
            >
              <div
                className="w-24 h-24 rounded-full border-2 flex items-center justify-center mb-4 relative"
                style={{ borderColor: currentTrack.color, boxShadow: `0 0 20px ${currentTrack.color}40` }}
              >
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: currentTrack.color }} />
                <Music size={40} style={{ color: currentTrack.color }} />
              </div>
              <h1 className="text-xl font-sans font-bold text-neon-cyan tracking-tight">{currentTrack.title}</h1>
              <p className="text-sm text-text-dim font-sans italic">{currentTrack.artist}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-neon-cyan shadow-[0_0_5px_#00f3ff]"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={prevTrack}
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-slate-800 text-white transition-all active:scale-90"
          >
            <SkipBack size={18} fill="currentColor" />
          </button>
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-neon-cyan text-black hover:scale-105 transition-all active:scale-95 shadow-[0_0_15px_rgba(0,243,255,0.3)] flex items-center justify-center"
          >
            {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" />}
          </button>
          <button
            onClick={nextTrack}
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-slate-800 text-white transition-all active:scale-90"
          >
            <SkipForward size={18} fill="currentColor" />
          </button>
        </div>

        <div className="flex items-center gap-4 px-2">
          <Volume2 size={16} className="text-slate-500" />
          <div className="h-1 flex-1 bg-slate-800 rounded-full">
            <div className="h-full w-2/3 bg-slate-500 rounded-full" />
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <div className="space-y-1">
          {TRACKS.map((track, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 py-3 border-b border-white/5 cursor-pointer transition-all ${
                i === currentTrackIndex ? 'opacity-100' : 'opacity-40 hover:opacity-60'
              }`}
              onClick={() => setCurrentTrackIndex(i)}
            >
              <div className={`text-[11px] font-mono font-bold w-6 ${
                i === currentTrackIndex ? 'text-neon-cyan' : 'text-text-dim'
              }`}>
                0{i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-[13px] font-bold truncate ${i === currentTrackIndex ? 'text-white' : 'text-slate-400'}`}>{track.title}</p>
                <p className="text-[10px] text-text-dim truncate lowercase tracking-wider">{track.artist}</p>
              </div>
              {i === currentTrackIndex && isPlaying && (
                <div className="ml-auto flex gap-0.5 h-3 items-end">
                  {[1, 2, 3].map((j) => (
                    <motion.div
                      key={j}
                      animate={{ height: ['40%', '100%', '30%'] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: j * 0.1 }}
                      className="w-0.5 bg-neon-cyan"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
