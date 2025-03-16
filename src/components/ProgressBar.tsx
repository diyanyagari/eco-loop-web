"use client";

import React, { useEffect, useState } from "react";

const ProgressBar: React.FC = () => {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // if (width >= 100) {
      //   clearInterval(interval); // Stop when it's full
      // }
    }, 10);

    setIsShow(false);
    return () => {
      clearInterval(interval);
    };
  }, []);


  if (!isShow) {
    return null;
  }

  return (
    <div
      className={`${
        isShow ? "flex" : "hidden"
      } fixed z-[3000] flex-row gap-5 items-center justify-center left-0 top-0 w-full min-w-dvw h-full min-h-dvh backdrop-blur-xs`}
    >
      <div className="h-10 w-10 rounded-2xl animate-bounce dark:bg-[#f7f7f7] bg-[#202124]" />
    </div>
  );
};

export default ProgressBar;
