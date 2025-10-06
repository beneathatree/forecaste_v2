"use client"

import BasicButton from "./components/functions/basicButton";
import Dropdown from "./components/functions/dropdown";
import People from "./components/svg/v2/people";
import College from "./components/svg/v2/college";

export default function Home() {
  return (
    <>
      <div 
        id="graphics-text-and-animations" 
        className="absolute top-0 bottom-0 right-0 left-0 overflow-hidden ">
          <Dropdown/>
          <People className="absolute bottom-[35px] right-[117px] z-10"/>
          <College className="absolute left-0 right-0 bottom-[220px] z-0"/>
      </div>
      <div 
        className="z-[30] h-full w-full flex flex-col items-start pb-3 justify-top relative p-5 mt-10"
        id="buttons-text-and-interactivity">
          <p>
          You have just arrived at a new premier institution. 
          You are proud of your achievements, are also in awe of your surroundings and your peers. 
          </p>
        <div id="possible-actions"
          className="flex flex-row w-full justify-left mt-2">
          <BasicButton text="Start!" href="/adjustment"/>
        </div>
      </div>
    </>
  );
}
