"use client";

import Link from "next/link";
import { Special_Elite } from "next/font/google";

const primaryFont = Special_Elite({
	weight: "400",
	subsets: ["latin"],
});

type Variant = "positive" | "negative" | "neutral";

type ActionButtonProps = {
	variant: Variant;
	text: string;
	href?: string;
	className?: string;
	onClick?: () => void;
};

const variantStyles: Record<Variant, string> = {
	positive: "bg-green-700 hover:bg-green-600",
	negative: "bg-red-700 hover:bg-red-600",
	neutral: "bg-blue-700 hover:bg-blue-600",
};

export default function ActionButton({
	variant,
	text,
	href = "/",
	className = "",
	onClick,
}: ActionButtonProps) {
	const baseClass = `z-30 inline-block pt-2 pb-1 px-3 text-white rounded-md transition-all duration-200 ${variantStyles[variant]} ${primaryFont.className} ${className}`;

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
