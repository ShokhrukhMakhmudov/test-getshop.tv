import { RefObject, useRef } from "react";
import media from "../assets/video.mp4";

let videoRef: RefObject<HTMLVideoElement>;

export const Video = ({ toggle }: { toggle: () => void }) => {
  videoRef = useRef<HTMLVideoElement>(null);
  return (
    <video
      ref={videoRef}
      className="video"
      onClick={() => toggle()}
      loop={true}
      autoPlay={true}>
      <source src={media} type="video/mp4" />
    </video>
  );
};

export function videoPlay() {
  videoRef.current?.play();
}

export function videoPause() {
  videoRef.current?.pause();
}
