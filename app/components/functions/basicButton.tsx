"use client"

import Link from "next/link";
import type React from "react";

type Props = {
	text?: string;
    className?: string;
    href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>
  & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const BasicButton = ({ text = "", className = "", href, ...props }: Props) => {
	const buttonStyling = `z-30 font-sans text-lg pt-1 pb-1 pr-2 pl-2 bg-black text-white rounded-md transition-all duration-200 ${className}`;

    if (href) {
        return (
            <Link href={href} className={buttonStyling} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
                {text}
            </Link>
        );
    }

    return (
		<button
			className={buttonStyling} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
                {text}
		</button>
	);
};

export default BasicButton;