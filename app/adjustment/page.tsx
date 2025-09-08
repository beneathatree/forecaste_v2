"use client"

import BasicButton from "../components/functions/basicButton";

export default function Home() {
  return (
    <>
    <div 
      id="app" 
      className="w-[400px] flex relative justify-center items-center flex-col bg-white border border-black">
      <h1 
        id="title"
        className="font-sans text-blue-500">forecaste</h1>
      <div 
        id="gameContainer" 
        className="absolute top-0 bottom-0 right-0 left-0 overflow-hidden">
      </div>
      <div 
        className="z-[30] h-[650px] w-full flex items-center pb-3 justify-center relative p-5"
        id="viewport">
            <p>
                You are also in confusion and are going through a lot of cultural shocks. 
                You've been facing microaggressions, othering and subtle casteism. 
                What do you do? 
                <ul className="flex flex-col gap-2 mt-2">
                    <li><BasicButton id="isolate-btn" text="Isolate yourselves."/></li>
                    <li><BasicButton id="smallBonds-btn" text="Form small bonds."/></li>
                    <li><BasicButton id="dice-btn" text="Roll a dice." /></li>
                </ul>
            </p>
      </div>
    </div>
    </>
  );
}
