import { Howl } from "howler";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

const routeToAudioMap: Record<string, string> = {
    "/": "/components/sounds/road-7016.mp3",
    "/adjustment": "/components/sounds/crowd-noise-375725.mp3",
}

export function useRouteAudio() {
    const pathname = usePathname();
    const currentSoundRef = useRef<Howl | null>(null);

    useEffect(() => {
        if (currentSoundRef.current) {
            currentSoundRef.current.stop();
            currentSoundRef.current.unload();
        }

        const audioFile = routeToAudioMap[pathname];
        if (audioFile) {
            currentSoundRef.current = new Howl({
                src: [audioFile],
                loop: true,
                volume: 0.5,
                onload: () => {
                    console.log(`Audio loaded for route: ${pathname}`);
                },
                onloaderror: (id, error) => {
                    console.warn(`Error loading audio for route: ${pathname}`);
                }
            });

            return () => {
                if (currentSoundRef.current) {
                    currentSoundRef.current.stop();
                    currentSoundRef.current.unload();
                }
            }
        }
    }, [pathname]);

    return {
        currentRoute: pathname,
        isPlaying: !!currentSoundRef.current?.playing() || false,
        volume: currentSoundRef.current?.volume() || 0,
        setVolume: (volume: number) => currentSoundRef.current?.volume(volume),
        play: () => currentSoundRef.current?.play(),
        pause: () => currentSoundRef.current?.pause(),
        stop: () => currentSoundRef.current?.stop(),
    }
}