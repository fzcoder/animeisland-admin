import React from 'react';
import qs from "qs";
import { useParams } from 'react-router-dom';
import { Input, Image } from 'antd';
import { CrudPage } from "../../../../components/advanced";
import { SingleImageUpload } from '../../../../components/upload';
import {
  addGradeForm,
  getInitGradeForm,
  getGradeRecords,
  updateGradeForm,
  deleteGradeRecord,
  deleteGradeRecords
} from "../../../../api/video/bangumi";

// 分级管理
export declare type VideoBangumiGradePageProps = {};
const VideoBangumiGradePage: React.FC<VideoBangumiGradePageProps> = (props) => {
  const params = useParams();
  return (
    <CrudPage
      tableRowKey={'id'}
      onGetRecords={async (keyword, pageNum, pageSize) => {
        try {
          return Promise.resolve(await getGradeRecords(keyword, pageNum, pageSize, params.id))
        } catch (err: any) {
          return Promise.reject(err);
        }
      }}
      onDeleteRecord={deleteGradeRecord}
      onDeleteSelectedRecords={deleteGradeRecords}
      useAddFormDialog
      addFormTitle={'添加番剧分级'}
      beforeOpenAddFormDialog={async () => {
        try {
          return Promise.resolve(await getInitGradeForm(params.id));
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
          name: 'iconUrl',
          label: '图标URL',
          hidden: false,
          children: <SingleImageUpload width={192} height={192} />
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
      onSubmitAddForm={addGradeForm}
      useUpdateFormDialog
      updateFormTitle={'修改番剧分级'}
      updateFormItemProps={[
        {
          name: 'name',
          label: '名称',
          hidden: false,
          children: <Input allowClear />
        },
        {
          name: 'iconUrl',
          label: '图标URL',
          hidden: false,
          children: <SingleImageUpload width={192} height={144} />
        },
        {
          name: 'id',
          label: 'ID',
          hidden: true,
          children: <Input allowClear />
        },
      ]}
      onSubmitUpdateForm={updateGradeForm}
      tableColumnsProps={[
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '标志',
          dataIndex: 'iconUrl',
          key: 'iconUrl',
          width: 80,
          render: (value: any, record: any, index: number) => (
            <Image src={value} width={64} height={48} preview={false} />
          )
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

export default VideoBangumiGradePage;