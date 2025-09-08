"use client"

import type React from "react";

type Props = {
	text?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const BasicButton = ({ text = "", className = "", ...props }: Props) => {
	return (
		<button
			className={`z-30 font-sans text-lg pt-1 pb-1 pr-2 pl-2 bg-black text-white rounded-md transition-all duration-200 ${className}`}
			{...props}>{text}
		</button>
	);
};

export default BasicButton;