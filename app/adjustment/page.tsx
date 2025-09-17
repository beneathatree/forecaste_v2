"use client"

import BasicButton from "../components/functions/basicButton";
import Clouds from "../components/svg/clouds";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  function handleCoinFlip() {
    const result = Math.random() > 0.6;
    router.push(result ? "/isolate" : "/small-bonds");
  }

  return (
    <>
      <div 
        id="graphics-text-and-animations" 
        className="absolute top-0 bottom-0 right-0 left-0 overflow-hidden ">
            <Clouds className="absolute top-[50px] left-[40px] right-[30px]"/>
      </div>
      <div 
        className="z-[30] h-full w-full flex flex-col items-start pb-3 justify-center relative p-5"
        id="buttons-text-and-interactivity">
            <p>
                You are also in confusion and are going through a lot of cultural shocks. 
                You have been facing microaggressions, othering and subtle casteism. 
                What do you do? 
            </p>
            <ul className="w-full flex flex-col gap-2 mt-2 items-start" id="possible-actions">
                <li><BasicButton href="/isolate" id="isolate-btn" text="Isolate yourselves." className="hover:bg-gray-800"/></li>
                <li><BasicButton href="/small-bonds" id="smallBonds-btn" text="Form small bonds." className="hover:bg-gray-800"/></li>
                <li><BasicButton onClick={handleCoinFlip} id="coin-btn" text="Flip a coin." className="hover:bg-gray-600"/></li>
                <li><BasicButton href="/" id="reset-btn" text="Reset Game" className="hover:bg-red-500"/></li>
            </ul>
      </div>
    </>
  );
}
