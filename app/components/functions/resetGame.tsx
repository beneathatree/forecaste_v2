"use client"

import {gsap} from "gsap";

export function resetGame () {
    gsap.killTweensOf("#leftGate, #rightGate");
    gsap.to("#leftGate, #rightGate",{
        duration: 1.2,
        scaleX: 1,
        skewY: 0,
        opacity: 1,
        ease: "power2.out",
    })
}