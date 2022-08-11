import React, { useEffect, useState, useRef } from "react";
import { Radio } from "antd";
import videojs, { VideoJsPlayerOptions } from "video.js";
import "./styles/video-js.css";
import "./styles/video-player.css";

export declare type VideoQualityProps = {
  value: string | number,
  label: string,
}
export declare type VideoSourceProps = {
  src: string,
  type?: string,
}
export declare type VideoPlayerProps = {
  title?: React.ReactNode,
  width?: number,
  height?: number,
  source?: VideoSourceProps,
  sources?: VideoSourceProps[],
  qualityList?: VideoQualityProps[],
  defaultQualityKey?: string | number,
  onSelectQuality?: (key: string | number) => void,
};
const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  // props
  const {
    title,
    source,
    width,
    height,
    qualityList,
    defaultQualityKey,
    onSelectQuality,
  } = props;
  // controls
  const videoRef = useRef<any>(null);
  const playerRef = useRef<any>(null);
  const [quality, setQuality] = useState<string | number>("");
  const [options, setOptions] = useState<VideoJsPlayerOptions>({
    autoplay: true,
    controls: true,
    preload: 'auto',
    language: 'zh-CN',
    aspectRatio: '16:9',
    fluid: true,
    sources: [],
  });
  // styles
  const divSizeStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    minHeight: "500px",
  }
  useEffect(() => {
    if (defaultQualityKey) {
      setQuality(defaultQualityKey);
    }
  },[]);
  useEffect(() => {
    if (source) {
      setOptions({...options, sources: [{...source}]});
    }
  },[source]);
  useEffect(() => {
    if (options.sources.length > 0) {
      // Make sure Video.js player is only initialized once
      if (!playerRef.current) {
        const videoElement = videoRef.current;
        if (!videoElement) return;
    
        const player = playerRef.current = videojs(videoElement, options, () => {
          videojs.log('player is ready');
          player.autoplay(options.autoplay);
          player.src(options.sources[0].src);
        });
      // You could update an existing player in the `else` block here
      // on prop change, for example:
      } else {
        const player = playerRef.current;
        player.autoplay(options.autoplay);
        player.src(options.sources[0].src);
      }
    }
  }, [options, videoRef]);
  useEffect(() => {
    if (qualityList) {
      if (qualityList.length > 0) {
        setQuality(qualityList[0].value);
      } else {
        setQuality("");
      }
    }
  },[qualityList]);
  return (
    <div className="video-player" style={divSizeStyle}>
      <div className="video-player-header">
        <h3>{title}</h3>
      </div>
      <video ref={videoRef} className="video-js" style={divSizeStyle}/>
      <div className="video-player-footer">
        <Radio.Group
          options={qualityList}
          value={quality}
          optionType={"button"}
          buttonStyle={"solid"}
          size={"small"}
          onChange={(e) => {
            setQuality(e.target.value);
            if (onSelectQuality) {
              onSelectQuality(e.target.value);
            }
          }}
        />
      </div>
    </div>
  )
}

export default VideoPlayer;