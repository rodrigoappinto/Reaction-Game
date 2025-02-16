"use client";

import { useState, useRef } from "react";
import Image from "next/image";

function Home() {
  const [gameOn, setGameOn] = useState(false);
  const [click, setClick] = useState(false);
  const [message, setMessage] = useState("");
  const [time, setTime] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const timeRef = useRef(null);

  const startGame = () => {
    setGameOn(true);
    setMessage(null);
    const waitSeconds = Math.floor(Math.random() * 6) + 1;
    timeRef.current = setTimeout(() => {
      setClick(true);
      setTime(Date.now());
    }, waitSeconds * 1000);
  };

  const validateClick = () => {
    if (click) {
      setClick(false);
      setGameOn(false);
      setMessage(`you took ${parseInt(Date.now() - time)}ms!`);

      if (highscore === 0 || parseInt(Date.now() - time) < highscore) {
        setHighscore(parseInt(Date.now() - time));
      }

      return;
    }
    setClick(false);
    setGameOn(false);
    setMessage("you clicked too early!");
    clearTimeout(timeRef.current);
  };

  return (
    <div>
      <div className="relative justify-center items-center">
        {!gameOn ? (
          <div className="flex flex-col items-center">
            {message !== "" && <h1 className="absolute w-screen text-center bottom-80 text-5xl">{message}</h1>}
            <div
              className="flex items-center justify-center w-64 h-64 rounded-full bg-[#e8e6e9] hover:opacity-95 "
              onClick={() => startGame()}
            >
              <p className="text-3xl text-[#242327] ">start game!</p>
            </div>
          </div>
        ) : (
          <div
            className={`w-64 h-64 ${
              click ? "bg-[#bbd08b]" : "bg-[#c0394e]"
            } rounded-full hover:opacity-90`}
            onClick={() => validateClick()}
          />
        )}
      </div>
      <div className="absolute top-5 right-5 p-3 rounded-2xl">
        highscore: {highscore}ms
      </div>
    </div>
  );
}

export default Home;
