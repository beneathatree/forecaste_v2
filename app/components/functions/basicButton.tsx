"use client"

import Link from "next/link";
import type React from "react";
import { Special_Elite } from 'next/font/google'

const primaryFont = Special_Elite({
  weight: '400',
  subsets: ['latin']
})

type Props = {
	text?: string;
    className?: string;
    href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>
  & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const BasicButton = ({ text = "", className = "", href, ...props }: Props) => {
    const buttonStyling = `z-30 inline-block pt-2 pb-1 px-3 bg-black text-white rounded-md transition-all duration-200 hover:bg-gray-600 ${primaryFont.className} ${className}`;

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