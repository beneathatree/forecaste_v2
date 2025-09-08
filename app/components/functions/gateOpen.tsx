export function gateOpen(): Promise<void> {
    return new Promise((resolve) => {
      let completed = 0;
      const done = () => {
        completed += 1;
        if (completed === 2) resolve();
      };

      gsap.to("#leftGate", {
        duration: 1.2,
        scaleX: 0.1,
        skewY: -20,
        opacity: 0.4,
        ease: "power2.out",
        onComplete: done,
      });

      gsap.to("#rightGate", {
        duration: 1.2,
        scaleX: 0.1,
        skewY: 20,
        opacity: 0.4,
        ease: "power2.out",
        onComplete: done,
      });
    });
}