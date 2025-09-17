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
        className="z-[30] h-full w-full flex flex-col items-start pb-3 justify-center relative p-5"
        id="buttons-text-and-interactivity">
          <p>
          You have just arrived at a new premier institution. 
          You are proud of your achievements, are also in awe of your surroundings and your peers. 
          </p>
        <div id="possible-actions"
          className="flex flex-row w-full justify-center">
          <BasicButton text="Start!" href="/adjustment"/>
        </div>
      </div>
    </>
  );
}
