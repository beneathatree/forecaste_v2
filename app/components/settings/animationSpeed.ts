export type AnimationSpeed = "slow" | "medium" | "fast";

/** Ordered slowest → fastest. The settings stepper walks this array. */
export const ANIMATION_SPEEDS = ["slow", "medium", "fast"] as const;

export const DEFAULT_ANIMATION_SPEED: AnimationSpeed = "medium";

export const ANIMATION_SPEED_STORAGE_KEY = "forecaste:animationSpeed";

export const ANIMATION_SPEED_MULTIPLIERS: Record<AnimationSpeed, number> = {
    slow: 1.75,
    medium: 1,
    fast: 0.5,
};

export const ANIMATION_SPEED_LABELS: Record<AnimationSpeed, string> = {
    slow: "Slow",
    medium: "Medium",
    fast: "Fast",
};

export function isAnimationSpeed(value: unknown): value is AnimationSpeed {
    return ANIMATION_SPEEDS.includes(value as AnimationSpeed);
}
