"use client"

import BasicButton from "./components/functions/basicButton";

export default function Home() {
  return (
    <>
      <div 
        id="graphics-text-and-animations" 
        className="absolute top-0 bottom-0 right-0 left-0 overflow-hidden ">
      </div>
      <div 
        className="z-[30] h-full w-full flex items-end pb-3 justify-center relative"
        id="buttons-text-and-interactivity">
        <div id="buttonContainer"
          className="flex flex-row gap-3">
          <BasicButton text="Start!" href="/placeholding"/>
        </div>
      </div>
    </>
  );
}
