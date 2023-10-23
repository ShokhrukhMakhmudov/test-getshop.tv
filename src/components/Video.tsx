import { useRef } from "react";
import media from "../assets/video.mp4";

const videoRef = useRef<HTMLVideoElement>(null);

export const Video = ({ toggle }: { toggle: () => void }) => {
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
