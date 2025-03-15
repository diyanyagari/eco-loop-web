"use client";

import React, { useEffect, useState } from "react";

const ProgressBar: React.FC = () => {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const progressBar = document.getElementById("progress-bar") as HTMLElement;
    progressBar.style.width = "0%";
    let width = 0;

    const interval = setInterval(() => {
      width += 1;
      progressBar.style.width = `${width}%`;
      if (width >= 100) {
        clearInterval(interval); // Stop when it's full
      }
    }, 10); // Increase progress by 1% every 10ms

    // Stop the progress bar once the page is fully loaded
    setIsShow(false); // Set state to false once loading is done
    window.addEventListener("load", () => {
      setTimeout(() => {
        progressBar.style.width = "100%"; // Set to 100% after page load
      }, 300); // Small delay to ensure it reaches 100%
    });

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  useEffect(() => {
    console.log("isShow ", isShow);
  }, [isShow]);

  if (!isShow) {
    return null; // Render nothing when isShow is false
  }

  return (
    <div
      className={`${
        isShow ? "flex" : "hidden"
      } fixed z-[3000] flex-row gap-5 items-center justify-center left-0 top-0 w-full min-w-dvw h-full min-h-dvh backdrop-blur-xs`}
    >
      <div
        id="progress-bar"
        style={{
          width: "0%",
          height: "4px",
          backgroundColor: "#0070f3",
          display: "none",
        }}
      ></div>
      <div className="h-10 w-10 rounded-2xl animate-bounce dark:bg-[#f7f7f7] bg-[#202124]" />
    </div>
  );
};

export default ProgressBar;
