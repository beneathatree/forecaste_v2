"use client";

import React, { useEffect, useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log(`isOpen is ${isOpen}`);
  }, [isOpen]);

  return (
    <div className="absolute right-3 top-3 inline-block text-left overflow-visible z-50 transition-all-300">
      <div>
        <button
          onClick={toggleDropdown}
          className={`inline-flex justify-center w-full rounded-md
                        shadow-sm px-4 pb-2 pt-3 bg-white 
                        text-xs ${
                          isOpen
                            ? "hover:bg-blue-50 text-blue-500 border border-blue-500"
                            : "hover:bg-gray-50 text-gray-700 border border-gray-700"
                        }`}
        >
          Options
          <svg
            className={`ml-2 -mr-1 mt-[-2] h-5 w-5 transition-transform duration-200 ${isOpen ? '-rotate-180' : 'rotate-0'}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 
                    rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
                    focus:outline-none"
          role="menu"
        >
          <div className="py-1" role="none">
            <p
              className="block px-4 py-2 text-sm text-gray-700 
                            hover:bg-gray-100"
              role="menuitem"
            >
              Account settings
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;