import React, { useState, useEffect, lazy } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs } from 'antd';
import BangumiTypePage from "./detail/BangumiTypePage";
import BangumiGradePage from "./detail/BangumiGradePage";
import BangumiTagsPage from "./detail/BangumiTagsPage";
import BangumiSearchPage from "./detail/BangumiSearchPage";

const { TabPane } = Tabs;

export declare type VideoChannelDetailPageProps = {};
const VideoChannelDetailPage: React.FC<VideoChannelDetailPageProps> = (props) => {
  const [tabActiveKey, setTabActiveKey] = useState<string>("");
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const _tabActiveKey = searchParams.get("tab");
    if (_tabActiveKey) {
      setTabActiveKey(_tabActiveKey);
    } else {
      setTabActiveKey("bangumi_search");
    }
  }, []);
  return (
    <div className={"app-video-channel-detail"}>
      <Tabs 
        activeKey={tabActiveKey} 
        tabPosition={"right"}
        onChange={(activeKey: string) => { setTabActiveKey(activeKey); }}
        style={{ minHeight: '300px' }}
      >
        <TabPane tab={"番剧搜索"} key={"bangumi_search"}>
          { tabActiveKey === "bangumi_search" && <BangumiSearchPage /> }
        </TabPane>
        <TabPane tab={"类型管理"} key={"bangumi_type"}>
          <BangumiTypePage />
        </TabPane>
        <TabPane tab={"分级管理"} key={"bangumi_grade"}>
          <BangumiGradePage />
        </TabPane>
        <TabPane tab={"标签管理"} key={"bangumi_tags"}>
          <BangumiTagsPage />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default VideoChannelDetailPage;