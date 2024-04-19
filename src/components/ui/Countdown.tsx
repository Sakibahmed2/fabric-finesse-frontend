"use client";

import React from "react";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

const CountdownTimer = ({
  durationInMinutes,
}: {
  durationInMinutes: number;
}) => {
  const [endTime, setEndTime] = useState(
    Date.now() + durationInMinutes * 60 * 1000
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setEndTime(Date.now() + durationInMinutes * 60 * 1000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [durationInMinutes]);

  const renderer = ({
    minutes,
    seconds,
    completed,
  }: {
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      return <span>Flash sale has ended!</span>;
    } else {
      return (
        <div className="md:text-2xl bg-red-50 text-red-500 font-semibold border-2 border-red-300 rounded-lg md:w-[50%] mx-auto py-4 mb-5 md:mb-0">
          <p className="flex justify-center items-center gap-2">
            Sale ended in -
            <span>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </p>
        </div>
      );
    }
  };

  return <Countdown date={endTime} renderer={renderer} />;
};

export default CountdownTimer;
