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
        className="z-[30] h-[650px] w-full flex items-end pb-3 justify-center relative"
        id="viewport">
        <div id="buttonContainer"
          className="flex flex-row gap-3">
          <BasicButton id="start-btn" text="Start!" className="hover:bg-gray-800"/>
          <BasicButton id="reset-btn" text="Reset" className="hover:bg-red-500"/>
        </div>
      </div>
    </div>
    </>
  );
}
