import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image, message, Descriptions, Space, Tag } from 'antd';
import { getCountryNameByCode } from "../../../api/utils/country";
import { getStatus, getView } from "../../../api/video/bangumi";
import { getList as getEpisodeList, EpisodeProps } from "../../../api/video/episode";
import EpisodeList from "./common/EpisodeList";
import './style/Detail.css';

// 番剧
type Bangumi = Record<string, any>;

const VideoBangumiDetail: React.FC<{}> = () => {
  const params = useParams();
  const [bangumi, setBangumi] = useState<Bangumi | undefined>(undefined);
  const [episodes, setEpisodes] = useState<EpisodeProps[] | undefined>(undefined);
  const [countryNameZh, setCountryNameZh] = useState<string>("");
  const [statusName, setStatusName] = useState<string>("");
 
  useEffect(() => {
    (async () => {
      try {
        const data = await getView(params.id);
        const { nameZh } = getCountryNameByCode(data.country);
        const { label } = getStatus(data.status);
        setBangumi(data);
        setCountryNameZh(nameZh);
        setStatusName(label);
      } catch (err: any) {
        message.error(err);
      }
    })()
  }, []);

  useEffect(() => {
    if (bangumi) {
      (async () => {
        try {
          setEpisodes(await getEpisodeList(params.id));
        } catch (err: any) {
          message.error(err);
        }
      })()
    }
  }, [bangumi])

  return (
    <div className='app-video-bangumi-detail'>
      {
        bangumi ? (
          <>
            <div className='app-video-bangumi-detail-header'>
              <div className='app-video-bangumi-detail-cover'>
                <Image
                  src={bangumi.cover}
                  width={270}
                  height={360}
                />
              </div>
              <div className='app-video-bangumi-detail-header-info'>
                <Descriptions
                  title={<h2>{bangumi.title}</h2>}
                  column={2}
                >
                  <Descriptions.Item label="原标题" span={2}>{bangumi.originTitle}</Descriptions.Item>
                  <Descriptions.Item label="国家(地区)">{countryNameZh}</Descriptions.Item>
                  <Descriptions.Item label="上映时间">{bangumi.releaseDate}</Descriptions.Item>
                  <Descriptions.Item label="状态">{statusName}</Descriptions.Item>
                  <Descriptions.Item label="所属频道">
                    {
                      bangumi.channel ?
                      <a href={`/video/channel/details/${bangumi.channel.id}`}>
                        {bangumi.channel.name}
                      </a> :
                      <span>无</span>
                    }
                  </Descriptions.Item>
                  <Descriptions.Item label="类型">
                    <span>{bangumi.type ? bangumi.type.name : "无"}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label="分级">
                    { bangumi.grade ?<span>{bangumi.grade.name}</span> : <span>无</span>}
                  </Descriptions.Item>
                  <Descriptions.Item label="标签" span={2}>
                    <Space>
                      {bangumi.tags?.map((item: Record<string, any>, key: number) => (
                        <Tag key={key} color={item.colorHex}>{item.name}</Tag>
                      ))}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="简介" span={2}>
                    <div style={{height: "92px", overflowY: "auto"}}>{bangumi.description}</div>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
            <div className='app-video-bangumi-detail-main'>
              <EpisodeList episodes={episodes} />
            </div>
          </>
        ) : (
          <div></div>
        )
      }
    </div>
  )
}

export default VideoBangumiDetail;
