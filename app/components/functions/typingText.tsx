"use client";

import { TypeAnimation } from "react-type-animation";

interface TypingTextProps {
    text: string;
}

export default function TypingText({ text }: TypingTextProps) {
    return (
        <div className="bg-white border border-black pt-2 pb-1 px-4">
            <TypeAnimation
                sequence={[text]}
                wrapper="div"
                speed={50}
                cursor={false}
            />
        </div>
    );
}
