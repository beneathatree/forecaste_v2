import { Howl } from "howler";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

//Defining route mapping:
const routeToAudioMap = {
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
    })
}