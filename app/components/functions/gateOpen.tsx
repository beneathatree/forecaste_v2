"use client"

import { gsap } from "gsap";

export function gateOpen() {
    gsap.to("#leftGate", {
      duration: 1.2,
      scaleX: 0.1,
      skewY: -20,
      opacity: 0.4,
      ease: "power2.out",
    })

    gsap.to("#rightGate", {
      duration: 1.2,
      scaleX: 0.1,
      skewY: 20,
      opacity: 0.4,
      ease: "power2.out",
    })
}