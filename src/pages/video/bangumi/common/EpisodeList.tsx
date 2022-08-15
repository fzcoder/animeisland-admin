import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Row, Col, Typography } from 'antd';
import { EpisodeProps } from "../../../../api/video/episode";
import "./styles/episode-list.css";

const { TabPane } = Tabs;
const { Paragraph  } = Typography;

export type EpisodeListTabPaneProps = {
  tab?: string | undefined,
  children?: EpisodeProps[] | undefined,
}

// 剧集列表属性
export type EpisodeListProps = {
  episodes?: EpisodeProps[] | undefined,
}

// 剧集列表
const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes
}) => {
  const navigate = useNavigate();
  const [tabPanes, setTabPanes] = useState<EpisodeListTabPaneProps[]>([]);
  const GroupNum = 8;

  useEffect(() => {
    if (episodes) {
      const _tabPanes: EpisodeListTabPaneProps[] = [];
      for (let i = 0; i < episodes.length; i += GroupNum) {
        if (i + GroupNum < episodes.length) {
          const children = episodes.slice(i, i + GroupNum);
          const tab = `${children[0].orderName}-${children[children.length-1].orderName}`
          _tabPanes.push({ tab, children });
        } else {
          const children = episodes.slice(i, episodes.length);
          const tab = `${children[0].orderName}-${children[children.length-1].orderName}`
          _tabPanes.push({ tab, children });
        }
      }
      setTabPanes(_tabPanes);
    }
  }, [episodes])

  return (
    <>
      {
        episodes && episodes.length > 0 ? (
          <Tabs
            defaultActiveKey="0"
            tabBarExtraContent={{
              left: <span style={{ fontWeight: 'bold', fontSize: '14pt', marginRight: '24px' }}>剧集</span>
            }}
          >
            {
              tabPanes.map((tabPane, index) => (
                <TabPane key={index} tab={tabPane.tab}>
                  <Row gutter={10}>
                    {
                      tabPane.children && tabPane.children.map((child, index) => (
                        <Col span={6} key={index}>
                          <a
                            className='app-video-bangumi-common-episodelist-item'
                            onClick={() => navigate(`/video/bangumi/play/${child.id}`)}
                          >
                            <div className='app-video-bangumi-common-episodelist-item-cover'></div>
                            <div className='app-video-bangumi-common-episodelist-item-info'>
                              <h4>{child.orderName}</h4>
                              <Paragraph
                                style={{color: "gray"}}
                                ellipsis={{ rows: 1, expandable: false }}
                              >{child.title}</Paragraph>
                            </div>
                          </a>
                        </Col>
                      ))
                    }
                  </Row>
                </TabPane>
              ))
            }
          </Tabs>
        ) : (
          <div></div>
        )
      }
    </>
  )
}

export default EpisodeList;