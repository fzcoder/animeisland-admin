import React from 'react';
import { useParams } from 'react-router-dom';
import { EditPage } from '../../../components/advanced';
import { addForm, getInitForm, getForm, updateForm } from "../../../api/video/channel";
import { Input } from 'antd';
const { TextArea } = Input;
export interface ChannelEditPageProps {
  updateMode?: boolean,
};
const ChannelEditPage: React.FC<ChannelEditPageProps> = ({ updateMode }) => {
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
        {
          label: 'UID',
          name: 'uid',
          hidden: true,
          children: <Input />
        },
        {
          label: '名称',
          name: 'name',
          hidden: false,
          children: <Input allowClear />
        },
        {
          label: '唯一访问路径',
          name: 'uniqueAccessPath',
          hidden: false,
          children: <Input allowClear />
        },
        {
          label: '描述',
          name: 'description',
          hidden: false,
          children: <TextArea />
        },
      ]}
      updateFormItemsProps={[
        {
          label: 'id',
          name: 'id',
          hidden: true,
          children: <Input />
        },
        {
          label: '名称',
          name: 'name',
          hidden: false,
          children: <Input allowClear />
        },
        {
          label: '唯一访问路径',
          name: 'uniqueAccessPath',
          hidden: false,
          children: <Input allowClear />
        },
        {
          label: '描述',
          name: 'description',
          hidden: false,
          children: <TextArea />
        },
      ]}
    />
  )
}
export default ChannelEditPage;
