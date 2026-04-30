"use client";

import Link from "next/link";

type Variant = "positive" | "negative" | "neutral";

type ActionButtonProps = {
    variant: Variant;
    text: string;
    href?: string;
    className?: string;
    onClick?: () => void;
};

const variantStyles: Record<Variant, string> = {
    positive: "bg-[#3d7a3d] hover:bg-[#4a8e4a] text-[#e8f5e8]",
    negative: "bg-[#7a2020] hover:bg-[#8f2828] text-[#ffd0d0]",
    neutral: "bg-[#7a5a1a] hover:bg-[#8f6b22] text-[#f5e8c0]",
};

export default function ActionButton({
    variant,
    text,
    href = "/",
    className = "",
    onClick,
}: ActionButtonProps) {
    const baseClass = `btn-emboss z-30 inline-block px-3 py-2 text-[10px] tracking-wide border-none cursor-pointer select-none transition-[transform] duration-[50ms] ease-in-out active:translate-y-[5px] text-[14px]! ${variantStyles[variant]} ${className}`;

    if (onClick) {
        return (
            <div>
                <button onClick={onClick} className={baseClass}>
                    {text}
                </button>
            </div>
        );
    }

    return (
        <div>
            <Link href={href} className={baseClass}>
                {text}
            </Link>
        </div>
    );
}
