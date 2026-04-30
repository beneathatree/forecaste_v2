"use client";

import Link from "next/link";
import type React from "react";
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
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

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
	...props
}: ActionButtonProps) {
	const baseClass = `z-30 inline-block pt-2 pb-1 px-3 text-white rounded-md transition-all duration-200 ${variantStyles[variant]} ${primaryFont.className} ${className}`;

	return (
		<div>
			<button>
				<Link
					href={href}
					className={baseClass}
					{...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
				>
					{text}
				</Link>
			</button>
		</div>
	);
}
