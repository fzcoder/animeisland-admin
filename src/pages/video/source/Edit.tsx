import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Input, InputNumber, Select, message } from "antd";
import { EditPage } from "../../../components/advanced";
import { SingleImageUpload } from "../../../components/upload";
import { addForm, getInitForm, getForm, updateForm } from "../../../api/video/source";
import { getVideoSourceMimeType, MimeTypeProps } from "../../../api/utils/mime-type";

export declare type VideoSourceEditPageProps = {
  updateMode?: boolean,
}
const VideoSourceEditPage: React.FC<VideoSourceEditPageProps> = ({updateMode}) => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [mimeTypeList, setMimeTypeList] = useState<MimeTypeProps[]>([]);
  useEffect(() => {
    (async () => {
      try {
        setMimeTypeList(await getVideoSourceMimeType());
      } catch (err: any) {
        message.error(err);
      }
    })()
  },[]);
  return (
    <EditPage
      updateMode={updateMode}
      updateRecordKey={params.id}
      onGetInitFormData={async () => {
        try {
          return Promise.resolve(await getInitForm(searchParams.get("vid") || ""))
        } catch (err: any) {
          return Promise.reject(err);
        }
      }}
      onGetInitUpdateFormData={getForm}
      onSubmitForm={addForm}
      onUpdateForm={updateForm}
      formItemsProps={[
        { name: "uid", label: "UID", hidden: true, children: <Input disabled /> },
        { name: "videoId", label: "VID", hidden: true, children: <Input disabled /> },
        { name: "width", label: "宽度(Pixels)", children: <InputNumber min={1} /> },
        { name: "height", label: "高度(Pixels)", children: <InputNumber min={1} /> },
        { name: "quality", label: "画质", children: <Input allowClear /> },
        { name: "mimeType", label: "媒体类型", children: <Select options={mimeTypeList} /> },
        { name: "screenshot", label: "视频截帧", children: <SingleImageUpload /> },
        { name: "url", label: "播放地址", children: <Input allowClear /> },
      ]}
      updateFormItemsProps={[
        { name: "id", label: "ID", hidden: true, children: <Input disabled /> },
        { name: "videoId", label: "VID", hidden: true, children: <Input disabled /> },
        { name: "width", label: "宽度(Pixels)", children: <InputNumber min={1} /> },
        { name: "height", label: "高度(Pixels)", children: <InputNumber min={1} /> },
        { name: "quality", label: "画质", children: <Input allowClear /> },
        { name: "mimeType", label: "媒体类型", children: <Select options={mimeTypeList} /> },
        { name: "screenshot", label: "视频截帧", children: <SingleImageUpload /> },
        { name: "url", label: "播放地址", children: <Input allowClear /> },
      ]}
    />
  )
}

export default VideoSourceEditPage;