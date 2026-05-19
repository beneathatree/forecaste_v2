import type { Variant } from "../actionButton";

export type Action = {
    text: string;
    variant: Variant;
    onClick: () => void;
};
