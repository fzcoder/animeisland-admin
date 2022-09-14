import { lazy } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  MenuOutlined,
  UploadOutlined,
  PlusCircleOutlined,
  OrderedListOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { ServicePage, ModulePage } from "../../components/template";

const Home = lazy(() => import('./home/Home'));
const ItemEdit = lazy(() => import('./item/Edit'));
const ItemTable = lazy(() => import('./item/Table'));
const ItemPlay = lazy(() => import("./item/Play"));
const BangumiEdit = lazy(() => import('./bangumi/Edit'));
const BangumiTable = lazy(() => import('./bangumi/Table'));
const BangumiDetails = lazy(() => import('./bangumi/Detail'));
const BangumiPlay = lazy(() => import('./bangumi/Play'));
const EpisodeCreate = lazy(() => import('./episode/create'));
const EpisodeTable = lazy(() => import('./episode/Table'));
const ChannelList = lazy(() => import('./channel/List'));
const ChannelEdit = lazy(() => import('./channel/Edit'));
const ChannelDetails = lazy(() => import('./channel/Detail'));
const SeriesDetails = lazy(() => import('./series/Details'));
const SeriesEdit = lazy(() => import('./series/Edit'));
const SeriesTable = lazy(() => import('./series/Table'));
const Settings = lazy(() => import('./settings/Settings'));
const SourceList = lazy(() => import('./source/Table'));
const SourceEdit = lazy(() => import('./source/Edit'));


export const VideoService = () => {
  const navigate = useNavigate();
  return (
    <ServicePage
      menuProps={{
        mode: "inline",
        onClick: ({key}) => navigate(key),
        defaultOpenKeys: ["/video/item", "/video/bangumi", "/video/channel", "/video/series"],
        items: [
          { key: '/video', label: '首页', icon: <HomeOutlined /> },
          {
            key: '/video/item',
            label: '视频管理',
            icon: <MenuOutlined />,
            children: [
              { key: '/video/item/upload', label: '视频上传', icon: <UploadOutlined /> },
              { key: '/video/item/list', label: '视频列表', icon: <OrderedListOutlined /> },
            ]
          },
          {
            key: '/video/bangumi',
            label: '番剧管理',
            icon: <MenuOutlined />,
            children: [
              { key: '/video/bangumi/edit', label: '番剧上架', icon: <PlusCircleOutlined /> },
              { key: '/video/bangumi/list', label: '番剧列表', icon: <OrderedListOutlined /> },
            ]
          },
          {
            key: '/video/channel',
            label: '频道管理',
            icon: <MenuOutlined />,
            children: [
              { key: '/video/channel/edit', label: '添加频道', icon: <PlusCircleOutlined /> },
              { key: '/video/channel/list', label: '频道列表', icon: <OrderedListOutlined /> },
            ]
          },
          {
            key: '/video/series',
            label: '系列管理',
            icon: <MenuOutlined />,
            children: [
              { key: '/video/series/edit', label: '添加系列', icon: <PlusCircleOutlined /> },
              { key: '/video/series/list', label: '系列列表', icon: <OrderedListOutlined /> },
            ]
          },
          { key: '/video/settings', label: '设置', icon: <SettingOutlined /> }
        ]
      }}
    />
  )
};

export const VideoServiceHome = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '主页' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 首页`}}
    main={<Home />}
  />
);

export const VideoServiceSettings = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '设置' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 视频设置`}}
    main={<Settings />}
  />
);

export const VideoServiceItemUpload = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '视频上传' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 视频上传`}}
    main={<ItemEdit />}
  />
);

export const VideoServiceItemUpdate = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '更新视频信息' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 更新视频信息`}}
    main={<ItemEdit updateMode/>}
  />
);

export const VideoServiceItemTable = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '视频列表' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 视频列表`}}
    main={<ItemTable />}
  />
);

export const VideoServiceItemPlay = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '播放视频' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 播放视频`}}
    main={<ItemPlay />}
  />
);

export const VideoServiceBangumiCreate = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '上架番剧' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 上架番剧`}}
    main={<BangumiEdit />}
  />
);

export const VideoServiceBangumiTable = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '番剧列表' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 番剧列表`}}
    main={<BangumiTable />}
  />
);

export const VideoServiceBangumiUpdate = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '更新番剧信息' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 更新番剧信息`}}
    main={<BangumiEdit updateMode />}
  />
);

export const VideoServiceBangumiDetails = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '番剧详情' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 番剧详情`}}
    main={<BangumiDetails />}
  />
);

export const VideoServiceBangumiPlay = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '播放番剧' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 播放番剧`}}
    main={<BangumiPlay />}
  />
);

export const VideoServiceEpisodeCreate = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '添加剧集' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 添加剧集`}}
    main={<EpisodeCreate />}
  />
);

export const VideoServiceEpisodeTable = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '剧集列表' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 剧集列表`}}
    main={<EpisodeTable />}
  />
);

export const VideoServiceChannelCreate = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '创建频道' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 创建频道`}}
    main={<ChannelEdit />}
  />
);

export const VideoServiceChannelList = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '频道列表' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 频道列表`}}
    main={<ChannelList />}
  />
);

export const VideoServiceChannelUpdate = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '更新频道信息' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 更新频道信息`}}
    main={<ChannelEdit updateMode />}
  />
);

export const VideoServiceChannelDetails = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '频道详情' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 频道详情`}}
    main={<ChannelDetails />}
  />
);

export const VideoServiceSourceCreate = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '添加视频源' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 添加视频源`}}
    main={<SourceEdit />}
  />
);

export const VideoServiceSourceList = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '视频源列表' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 视频源列表`}}
    main={<SourceList />}
  />
);

export const VideoServiceSourceUpdate = () => (
  <ModulePage
    breadcrumbProps={{
      routes: [
        { path: '/', breadcrumbName: '首页' },
        { path: '/video', breadcrumbName: '视频服务' },
        { path: '', breadcrumbName: '修改视频源' },
      ]
    }}
    renderHtmlTitle={(brand) => { return `${brand} | 修改视频源`}}
    main={<SourceEdit updateMode/>}
  />
);

export const VideoSeriesCreate = () => {
  return (
    <ModulePage
      breadcrumbProps={{
        routes: [
          { path: '/', breadcrumbName: '首页' },
          { path: '/video', breadcrumbName: '视频服务' },
          { path: '', breadcrumbName: '添加系列' },
        ]
      }}
      renderHtmlTitle={(brand) => { return `${brand} | 添加系列`}}
      main={<SeriesEdit />}
    />
  )
};

export const VideoSeriesDetails = () => {
  return (
    <ModulePage
      breadcrumbProps={{
        routes: [
          { path: '/', breadcrumbName: '首页' },
          { path: '/video', breadcrumbName: '视频服务' },
          { path: '', breadcrumbName: '系列详情' },
        ]
      }}
      renderHtmlTitle={(brand) => { return `${brand} | 系列详情`}}
      main={<SeriesDetails />}
    />
  )
};

export const VideoSeriesTable = () => {
  return (
    <ModulePage
      breadcrumbProps={{
        routes: [
          { path: '/', breadcrumbName: '首页' },
          { path: '/video', breadcrumbName: '视频服务' },
          { path: '', breadcrumbName: '系列列表' },
        ]
      }}
      renderHtmlTitle={(brand) => { return `${brand} | 系列列表`}}
      main={<SeriesTable />}
    />
  )
};


export const VideoSeriesUpdate = () => {
  return (
    <ModulePage
      breadcrumbProps={{
        routes: [
          { path: '/', breadcrumbName: '首页' },
          { path: '/video', breadcrumbName: '视频服务' },
          { path: '', breadcrumbName: '修改系列' },
        ]
      }}
      renderHtmlTitle={(brand) => { return `${brand} | 修改系列`}}
      main={<SeriesEdit updateMode />}
    />
  )
};

