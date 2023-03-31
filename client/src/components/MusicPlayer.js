import React, { useState, useEffect, useRef } from "react";

import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { BsPlayFill, BsPause } from "react-icons/bs";
import "./MusicPlayer.css";

import TheBeatlesHelp from "../files/TheBeatlesHelp.m4a";
import { Slider, styled } from "@material-ui/core";

function MusicPlayer() {
  const player = useRef();

  const PSlider = styled(Slider)(({ ...props }) => ({
    color: "aliceblue",
    height: 2,
    "&:hover": { cursor: "auto", color: "lime" },
    "& .MuiSlider-thumb": {
      width: "13px",
      height: "13px",
      display: props.thumbless ? "none" : "block",
    },
  }));

  const [play, setPlay] = useState(true);
  const [volume, setVolume] = useState(1);
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    player.current.volume = newValue;
  };

  useEffect(() => {
    console.log("clicked");
    if (play) {
      player.current.play();
    } else {
      player.current.pause();
    }
  }, [play]);

  const setVideoRunner = () => {
    setPlay(!play);
  };

  const [sound, setSound] = useState(false);

  useEffect(() => {
    player.current.autoplay = false;
    player.current.pause();
  }, []);

  return (
    <div className="music-player-container">
      <audio
        ref={player}
        src={TheBeatlesHelp}
        autoPlay={false}
        // playsInline
        // loop
        muted
        {...(sound ? { muted: true } : { muted: false })}
        className="video-player"
        volume={volume}
      />
      <div className="controls">
        <div className="flex gap-5 flex-wrap ml-[2rem]">
          {!play ? (
            <button className="control-btn" onClick={setVideoRunner}>
              <BsPlayFill className="text-2xl" title="Play" />
            </button>
          ) : (
            <button className="control-btn" onClick={setVideoRunner}>
              <BsPause className="text-2xl" title="Paused" />
            </button>
          )}
        </div>
        <div className="mr-[8rem]">
          {sound ? (
            <button
              className="control-btn-1"
              onClick={() => setSound((prevState) => !prevState)}
            >
              <HiVolumeOff title="Vol-off" />
            </button>
          ) : (
            <button
              className="control-btn-1"
              onClick={() => setSound((prevState) => !prevState)}
            >
              <HiVolumeUp title="Vol-up" />
            </button>
          )}
          <PSlider
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={handleVolumeChange}
            title="volume"
          />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
