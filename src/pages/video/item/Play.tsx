import React, { useEffect, useState } from "react";
import { message, Space, Descriptions, Image } from "antd";
import { useParams } from 'react-router-dom';
import { VideoPlayer } from "../../../components/player";
import { VideoQualityProps, VideoSourceProps as _VideoSourceProps } from "../../../components/player/video-player/VideoPlayer";
import { getVideoItemWithPlayList } from "../../../api/video/item";
import { getPlay } from "../../../api/video/source";

export declare type VideoDetails = Record<string, any>;
export declare type VideoSource = Record<string, any>;
export declare type VideoItemPlayPageProps = {};
const VideoItemPlayPage: React.FC<VideoItemPlayPageProps> = () => {
  const params = useParams();
  const [video, setVideo] = useState<Record<string, any>>();
  const [qualities, setQualities] = useState<VideoQualityProps[]>([]);
  const [videoSource, setVideoSource] = useState<_VideoSourceProps>();
  useEffect(() => {
    (async () => {
      try {
        const _video = await getVideoItemWithPlayList(params.id);
        setVideo(_video);
        const srcList = _video.srcList as VideoSource[];
        const _qualities: VideoQualityProps[] = [];
        srcList.forEach(e => {
          _qualities.push({ value: e.id, label: e.quality });
        });
        setQualities(_qualities);
        const source = await getPlay(_qualities[0].value);
        setVideoSource({ src: source.url, type: source.mimeType });
      } catch (err: any) {
        return Promise.reject(err)
      }
    })();
  },[]);
  return (
    <div className="app-video-item-play">
      <Space direction={"vertical"} style={{display:"flex"}}>
        <VideoPlayer
          title={video?.title}
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
        <Descriptions column={2} bordered>
          <Descriptions.Item label={"标题"} span={2}>
            <h3>{video?.title}</h3>
          </Descriptions.Item>
          <Descriptions.Item label={"封面"} span={2}>
            <Image src={video?.poster} width={240} />
          </Descriptions.Item>
          <Descriptions.Item label={"描述"} span={2}>
            <span>{video?.description}</span>
          </Descriptions.Item>
          <Descriptions.Item label={"创建时间"}>
            <span>{video?.createTime}</span>
          </Descriptions.Item>
          <Descriptions.Item label={"最近修改时间"}>
            <span>{video?.lastModifyTime}</span>
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </div>
  )
}

export default VideoItemPlayPage;