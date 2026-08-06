import { Howl } from "howler";

/**
 * One shared instance for every clickable control, so the sound file is only
 * loaded once no matter how many buttons are on screen.
 */
const clickSound = new Howl({
    src: ["/sounds/click/generic-metallic-click-3.wav"],
    volume: 0.7,
});

export function playClickSound() {
    clickSound.play();
}
