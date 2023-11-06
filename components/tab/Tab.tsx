import React, { useState, Dispatch } from "react";

export default function Tab({
  tab,
  setTab,
  text1,
  text2,
}: {
  tab: boolean;
  setTab: Dispatch<React.SetStateAction<boolean>>;
  text1: string;
  text2: string;
}) {
  // const [tab, setTab] = useState(true)
  return (
    <div className="w-[calc(100vw-80px)] md:w-[calc(100vw-100px)] lg:w-full border-b my-6 border-b-gray-200">
      <div className="flex w-full md:w-80 items-center py-3 relative">
        <button
          onClick={() => setTab(true)}
          className={`w-1/2 text-base md:text-lg ${
            tab ? "text-black" : "text-gray-600"
          }  
            `}
        >
          {text1}
        </button>
        <button
          onClick={() => setTab(false)}
          className={`w-1/2 text-lg  ${
            tab ? "text-gray-600" : "text-black"
          } font-semibold
          
            `}
        >
          {text2}
        </button>
        <div
          className={`absolute w-1/2 h-[2px] left-0 bg-black bottom-0 ${
            tab ? " translate-x-0" : "translate-x-full"
          } 

            font-semibold 
            transition-all duration-300 ease-in-out`}
        ></div>
      </div>
    </div>
  );
}
