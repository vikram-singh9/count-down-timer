"use client";
import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const countdown = () => {
  const [duration, setduration] = useState<string | number>("");
  const [timeleft, settimeleft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // seting duration of timer

  const handleSetDuraion = (): void => {
    if (typeof duration === "number" && duration > 0) {
      settimeleft(duration);
      setIsActive(false);
      setIsPause(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // seting start of timer

  const handleStart = (): void => {
    if (timeleft > 0) {
      setIsActive(true);
      setIsPause(false);
    }
  };

  // seting stop of timer

  const hanldePause = (): void => {
    if (isActive) {
      setIsPause(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // handling reset

  const handleReset = (): void => {
    setIsActive(false);
    setIsPause(false);
    settimeleft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (isActive && !isPause) {
      timerRef.current = setInterval(() => {
        settimeleft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1; 
        });
      }, 1000);
    }
    return () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            
        }
    }
  },[isActive, isPause]);

//   function jo time ko manage karega 

  const formatTime = (time:number):string => {
    const minutes = Math.floor(time/60);
    const seconds = time % 60
    return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`
  }



  const handleDurationChange = (e:ChangeEvent<HTMLInputElement>):void => {
        setduration(Number(e.target.value) || '')
  };

  return (
    // Container div for centering the content
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      {/* Timer box container */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Title of the countdown timer */}
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
          Countdown Timer
        </h1>
         {/* Input and set button container */}
         <div className="flex items-center mb-6">
         <Input
            type="number"
            id="duration"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
          <Button
            onClick={handleSetDuraion}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
             Set
          </Button>
        </div>
        {/* Display the formatted time left */}
        <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          {formatTime(timeleft)}
        </div>
        {/* Buttons to start, pause, and reset the timer */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            {isPause ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={hanldePause}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Reset
          </Button>
        </div>
      </div>
      <p className="mt-3">Made with 🧡 by <strong>Vikram</strong></p>
    </div>
  );
};

export default countdown;
