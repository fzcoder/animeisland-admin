import React, { useEffect, useState } from "react";
import { message, Space } from "antd";
import { useParams } from 'react-router-dom';
import { VideoPlayer } from "../../../components/player";
import { VideoQualityProps, VideoSourceProps as _VideoSourceProps } from "../../../components/player/video-player/VideoPlayer";
import { getView, EpisodeProps, getList } from "../../../api/video/episode";
import { getVideoItemWithPlayList } from "../../../api/video/item";
import { getPlay } from "../../../api/video/source";
import EpisodeList from "./common/EpisodeList";

export declare type VideoDetails = Record<string, any>;
export declare type VideoSource = Record<string, any>;
export declare type VideoBangumiPlayPageProps = {};
const VideoBangumiPlayPage: React.FC<VideoBangumiPlayPageProps> = () => {
  const params = useParams();
  const [episode, setEpisode] = useState<EpisodeProps>();
  const [episodeList, setEpisodeList] = useState<EpisodeProps[]>();
  const [video, setVideo] = useState<Record<string, any>>();
  const [qualities, setQualities] = useState<VideoQualityProps[]>([]);
  const [videoSource, setVideoSource] = useState<_VideoSourceProps>();
  useEffect(() => {
    (async () => {
      try {
        // get episode
        const _episode = await getView(params.episodeId);
        setEpisode(_episode);
        // get video
        const _video = await getVideoItemWithPlayList(_episode.videoId);
        setVideo(_video);
        const srcList = _video.srcList as VideoSource[];
        const _qualities: VideoQualityProps[] = [];
        srcList.forEach(e => {
          _qualities.push({ value: e.id, label: e.quality });
        });
        setQualities(_qualities);
        const source = await getPlay(_qualities[0].value);
        setVideoSource({ src: source.url, type: source.mimeType });
        // get episodeList
        setEpisodeList(await getList(_episode.bangumiId));
      } catch (err: any) {
        return Promise.reject(err)
      }
    })();
  },[]);
  return (
    <div className="app-video-item-play">
      <Space direction={"vertical"} style={{display:"flex"}}>
        <VideoPlayer
          title={`${episode?.orderName} ${episode?.title}`}
          source={videoSource}
          qualityList={qualities}
          onSelectQuality={async (key) => {
            try {
              const source = await getPlay(key);
              setVideoSource({ src: source.url, type: source.mimeType });
            } catch (err: any) {
              message.error(err);
            }
          }}
        />
        <EpisodeList episodes={episodeList} />
      </Space>
    </div>
  )
}

export default VideoBangumiPlayPage;