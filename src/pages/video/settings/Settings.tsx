import React from "react";
import { Input } from "antd";
import { EditPage } from "../../../components/advanced";
import { getForm, updateForm } from "../../../api/video/settings";

export declare type VideoSettingsPageProps = {};
const VideoSettingsPage: React.FC<VideoSettingsPageProps> = () => {
  return (
    <EditPage
      updateMode
      onGetInitUpdateFormData={getForm}
      onUpdateForm={updateForm}
      updateFormItemsProps={[
        { name: 'id', hidden: true, children: <Input />  },
        { name: 'userId', hidden: true, children: <Input />  },
        { name: 'websiteHost', label: "网站地址", children: <Input allowClear/>  },
        { name: 'websiteBrand', label: "网站标题", children: <Input allowClear/>  },
        { name: 'videoResourceHost', label: "视频资源地址", children: <Input allowClear/>  },
        { name: 'videoResourceDir', label: "视频资源目录", children: <Input allowClear/>  },
      ]}
    />
  )
}

export default VideoSettingsPage;