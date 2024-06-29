import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import classNames from "classnames";
import Marquee from "react-fast-marquee";
import prettyMilliseconds from "pretty-ms";

export enum EPlatformType {
  SPOTIFY = "Spotify",
  YOUTUBE = "YouTube",
}

type SearchResultCardProps = {
  title: string;
  artists: string[];
  duration: number;
  coverUri?: string;
  platformType: EPlatformType;
  altText?: string;
  onClick?: () => void;
};

const TrackCard = (props: SearchResultCardProps) => {
  const shouldTitleMarqueePlay = props.title.length > 33;
  const shouldArtistsMarqueePlay = props.artists.join(", ").length > 45;

  const [isTitleMarqueePlaying, setTitleMarqueePlaying] = useState(
    shouldTitleMarqueePlay,
  );
  const [isArtistsMarqueePlaying, setArtistsMarqueePlaying] = useState(
    shouldArtistsMarqueePlay,
  );

  const handleTitleCycleComplete = async () => {
    setTitleMarqueePlaying(false);
    setTimeout(() => {
      setTitleMarqueePlaying(true);
    }, 2000);
  };

  const handleArtistsCycleComplete = async () => {
    setArtistsMarqueePlaying(false);
    setTimeout(() => {
      setArtistsMarqueePlaying(true);
    }, 2000);
  };

  const handleTitleHover = (isHovering: boolean) => {
    if (shouldTitleMarqueePlay) {
      setTitleMarqueePlaying(!isHovering);
    }
  };

  const handleArtistsHover = (isHovering: boolean) => {
    if (shouldArtistsMarqueePlay) {
      setArtistsMarqueePlaying(!isHovering);
    }
  };

  const getPlatformLogo = (type: EPlatformType) => {
    switch (type) {
      case EPlatformType.SPOTIFY:
        return faSpotify;
      case EPlatformType.YOUTUBE:
        return faYoutube;
    }
  };

  const getPlatformLogoColor = (type: EPlatformType) => {
    switch (type) {
      case EPlatformType.SPOTIFY:
        return "text-[#1DB954]";
      case EPlatformType.YOUTUBE:
        return "text-[#FF0000]";
    }
  };

  const getPlatformDropShadow = (type: EPlatformType) => {
    switch (type) {
      case EPlatformType.SPOTIFY:
        return "drop-shadow-[4px_4px_2px_rgba(10,93,18,0.75)]";
      case EPlatformType.YOUTUBE:
        return "drop-shadow-[4px_4px_2px_rgba(102,3,3,0.5)]";
    }
  };

  return (
    <button
      className={classNames(
        "bg-primary min-w-[300px] w-full max-w-[500px] h-[80px] rounded-xl flex flex-row relative",
        getPlatformDropShadow(props.platformType),
      )}
      onClick={props.onClick}
      disabled={!props.onClick}
    >
      {/* Cover */}
      {props.coverUri ? (
        <img
          src={props.coverUri}
          alt={"Cover art for " + props.title}
          className={"h-full w-24 rounded-l-xl object-cover"}
        />
      ) : (
        <div className={"flex items-center p-2"}>
          <FontAwesomeIcon icon={faCompactDisc} className={"h-full"} />
        </div>
      )}

      {/* Infos */}
      <div className={"flex flex-col w-full p-1"}>
        {/* Top row: title, platform logo */}
        <div className={"flex flex-row justify-between"}>
          <div
            onMouseEnter={() => handleTitleHover(true)}
            onMouseLeave={() => handleTitleHover(false)}
          >
            <Marquee
              delay={2}
              onCycleComplete={() => handleTitleCycleComplete()}
              play={isTitleMarqueePlaying}
            >
              <p className={"font-bold line-clamp-2 leading-tight"}>
                {props.title}
              </p>
            </Marquee>
          </div>

          {props.platformType && (
            <FontAwesomeIcon
              icon={getPlatformLogo(props.platformType)}
              className={classNames(
                "text-[28px] pl-1.5 pb-1.5 p-1",
                getPlatformLogoColor(props.platformType),
              )}
            />
          )}
        </div>

        {/* Bottom row: artist, duration */}
        <div className={"h-full w-full"}>
          <div
            onMouseEnter={() => handleArtistsHover(true)}
            onMouseLeave={() => handleArtistsHover(false)}
          >
            <Marquee
              delay={2}
              onCycleComplete={() => handleArtistsCycleComplete()}
              play={isArtistsMarqueePlaying}
            >
              <p className={"text-sm"}>{props.artists.join(", ")}</p>
            </Marquee>
          </div>
          <div className={"text-end absolute bottom-1.5 right-1.5 text-xs"}>
            <p>
              {prettyMilliseconds(props.duration, {
                secondsDecimalDigits: 0,
                colonNotation: true,
              })}
            </p>

            {props.altText && (
              <p className={"text-tertiary italic"}>{props.altText}</p>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default TrackCard;
