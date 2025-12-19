"use client";

import { TypeAnimation } from "react-type-animation";

interface TypingTextProps {
    text: string;
}

export default function TypingText({ text }: TypingTextProps) {
    return (
        <div className=" md:bg-amber-100 md:border-t md:border-black md:pt-2 md:pb-1 md:px-4 md:absolute md:left-0 md:right-0 md:bottom-0">
            <TypeAnimation
                sequence={[text]}
                wrapper="div"
                speed={50}
                cursor={false}
            />
        </div>
    );
}
