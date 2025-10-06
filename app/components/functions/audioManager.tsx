'use client';

import { usePathname } from 'next/navigation';
import { useAudio } from '../hooks/useAudio';
import { useMemo, useEffect, useState } from 'react';
import BasicButton from './basicButton';

export default function AudioManager() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  const audioSrc = useMemo(() => {
    switch (pathname) {
      case '/':
        return '/sounds/british-woods-ambient-noise-24942.mp3';
      case '/adjustment':
        return '/sounds/crowd-noise-375725.mp3';
      default:
        return '/sounds/british-woods-ambient-noise-24942.mp3';
    }
  }, [pathname]);

  const { isPlaying, togglePlayPause } = useAudio(audioSrc);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const buttonClassName = isClient 
    ? `${isPlaying ? 'hover:bg-red-500' : 'hover:bg-green-500'}`
    : 'hover:bg-green-500';

  return (
      <BasicButton
        onClick={togglePlayPause}
        className={buttonClassName}
        text={isPlaying ? 'Pause' : 'Play'}
      />
  );
}
