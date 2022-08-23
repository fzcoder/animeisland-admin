import React from "react";
import { Input } from "antd";
import { useParams } from "react-router-dom";
import { EditPage } from "../../../components/advanced";
import { getInitForm, getForm, addForm, updateForm } from '../../../api/video/series';

const { TextArea } = Input;

export declare type VideoSeriesEditPageProps = {
  updateMode?: boolean
}
const VideoSeriesEditPage: React.FC<VideoSeriesEditPageProps> = ({ updateMode }) => {
  const params = useParams();
  return (
    <EditPage
      updateMode={updateMode}
      updateRecordKey={params.id}
      onGetInitFormData={getInitForm}
      onGetInitUpdateFormData={getForm}
      onSubmitForm={addForm}
      onUpdateForm={updateForm}
      formItemsProps={[
        { name: 'uid', label: 'UID', hidden: true, children: <Input /> },
        { name: 'name', label: '系列名称', children: <Input /> },
        { name: 'description', label: '系列描述', children: <TextArea /> },
      ]}
      updateFormItemsProps={[
        { name: 'id', label: 'ID', hidden: true, children: <Input /> },
        { name: 'name', label: '系列名称', children: <Input /> },
        { name: 'description', label: '系列描述', children: <TextArea /> },
      ]}
    />
  )
}

export default VideoSeriesEditPage;