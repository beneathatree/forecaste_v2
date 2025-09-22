import { useEffect, useRef, useState } from 'react';

export function useAudio(audioSrc: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load new audio when src changes
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
    } else {
      audioRef.current.pause();
      audioRef.current = new Audio(audioSrc);
    }

    audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);

    return () => {
      audioRef.current?.pause();
    };
  }, [audioSrc]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return {
    isPlaying,
    togglePlayPause,
  };
}
