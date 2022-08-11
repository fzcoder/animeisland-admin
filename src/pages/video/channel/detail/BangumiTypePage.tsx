import React from 'react';
import { useParams } from 'react-router-dom';
import { Input } from 'antd';
import { CrudPage } from "../../../../components/advanced";
import {
  addTypeForm,
  getInitTypeForm,
  getTypeRecords,
  updateTypeForm,
  deleteTypeRecord,
  deleteTypeRecords
} from "../../../../api/video/bangumi";
// 类型管理
export declare type VideoBangumiTypePageProps = {};
const VideoBangumiTypePage: React.FC<VideoBangumiTypePageProps> = (props) => {
  const params = useParams();
  return (
    <CrudPage
      tableRowKey={'id'}
      onGetRecords={async (keyword, pageNum, pageSize) => {
        try {
          return Promise.resolve(await getTypeRecords(keyword, pageNum, pageSize, params.id))
        } catch (err: any) {
          return Promise.reject(err);
        }
      }}
      onDeleteRecord={deleteTypeRecord}
      onDeleteSelectedRecords={deleteTypeRecords}
      useAddFormDialog
      addFormTitle={'添加番剧类型'}
      beforeOpenAddFormDialog={async () => {
        try {
          return Promise.resolve(await getInitTypeForm(params.id));
        } catch (err: any) {
          return Promise.reject(err);
        }
      }}
      addFormItemProps={[
        {
          name: 'name',
          label: '名称',
          hidden: false,
          children: <Input allowClear />
        },
        {
          name: 'channelId',
          label: '频道ID',
          hidden: true,
          children: <Input allowClear />
        },
        {
          name: 'userId',
          label: '用户ID',
          hidden: true,
          children: <Input allowClear />
        },
      ]}
      onSubmitAddForm={addTypeForm}
      useUpdateFormDialog
      updateFormTitle={'修改番剧类型'}
      updateFormItemProps={[
        {
          name: 'name',
          label: '名称',
          hidden: false,
          children: <Input allowClear />
        },
        {
          name: 'id',
          label: 'ID',
          hidden: true,
          children: <Input allowClear />
        },
      ]}
      onSubmitUpdateForm={updateTypeForm}
      tableColumnsProps={[
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width: 200,
        },
      ]}
    />
  )
}

export default VideoBangumiTypePage;