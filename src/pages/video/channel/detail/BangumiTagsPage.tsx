import React from "react";
import { useParams } from 'react-router-dom';
import { Input, Tag } from 'antd';
import { CrudPage } from "../../../../components/advanced";
import {
  addTagForm,
  getInitTagForm,
  getTagRecords,
  updateTagForm,
  deleteTagRecord,
  deleteTagRecords,
} from "../../../../api/video/bangumi";

// 标签管理
export declare type VideoBangumiTagsPageProps = {};
const VideoBangumiTagsPage: React.FC<VideoBangumiTagsPageProps> = (props) => {
  const params = useParams();
  return (
    <CrudPage
      onGetRecords={async (keyword, pageNum, pageSize) => {
        try {
          return Promise.resolve(await getTagRecords(keyword, pageNum, pageSize, params.id || ""));
        } catch (err: any) {
          return Promise.reject(err);
        }
      }}
      onDeleteRecord={deleteTagRecord}
      onDeleteSelectedRecords={deleteTagRecords}
      useAddFormDialog
      addFormTitle={'添加番剧标签'}
      beforeOpenAddFormDialog={async () => {
        try {
          return Promise.resolve(await getInitTagForm(params.id || ""));
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
          name: 'colorHex',
          label: '标签颜色',
          hidden: false,
          children: <Input type={'color'} />
        },
        {
          name: 'channelId',
          label: '频道ID',
          hidden: true,
          children: <Input />
        },
        {
          name: 'userId',
          label: '用户ID',
          hidden: true,
          children: <Input />
        },
      ]}
      onSubmitAddForm={addTagForm}
      useUpdateFormDialog
      updateFormTitle={'修改番剧标签'}
      updateFormItemProps={[
        {
          name: 'name',
          label: '名称',
          hidden: false,
          children: <Input allowClear />
        },
        {
          name: 'colorHex',
          label: '标签颜色',
          hidden: false,
          children: <Input type={'color'} />
        },
        {
          name: 'id',
          label: 'ID',
          hidden: true,
          children: <Input />
        },
      ]}
      onSubmitUpdateForm={updateTagForm}
      tableColumnsProps={[
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '标签颜色',
          dataIndex: 'colorHex',
          key: 'colorHex',
          width: 100,
          render: (value: any, record: any, index: number) => (
            <Tag color={value}>{value}</Tag>
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

export default VideoBangumiTagsPage;