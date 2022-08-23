import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input } from "antd";
import { PlayCircleOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { CrudPage } from "../../../components/advanced";
import {
  getRecords,
  updateForm,
  updateBatch,
  deleteRecord,
  deleteRecords
} from "../../../api/video/episode";

const VideoEpisodeTablePage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <CrudPage
      showTableDraggableButton
      onAddRecord={() => navigate(`/video/episode/edit?bangumi_id=${searchParams.get("bangumi_id")}`)}
      useUpdateFormDialog
      updateFormTitle={"修改剧集信息"}
      onSubmitUpdateForm={updateForm}
      onDeleteRecord={deleteRecord}
      onDeleteSelectedRecords={deleteRecords}
      onFinishDrag={async (newOrderList) => {
        try {
          newOrderList.forEach((item, index) => {
            item['orderInBangumi'] = index + 1
          });
          await updateBatch(newOrderList);
        } catch (err: any) {
          return Promise.reject(err);
        }
      }}
      updateFormItemProps={[
        {
          name: 'id',
          hidden: true,
          children: <Input disabled />
        },
        {
          label: '标题',
          name: 'title',
          children: <Input allowClear />
        },
        {
          label: '序列名称',
          name: 'orderName',
          children: <Input allowClear />
        }
      ]}
      onGetRecords={async (key, pageNum, pageSize) => {
        try {
          return Promise.resolve(await getRecords(key, pageNum, pageSize, searchParams.get('bangumi_id') || ""))
        } catch (err: any) {
          return Promise.reject(err);
        }
      }}
      tableColumnsProps={[
        {
          title: '序列名称',
          dataIndex: 'orderName',
          key: 'orderName',
          width: 100,
        },
        {
          title: '剧集标题',
          dataIndex: 'title',
          key: 'title',
          render: (text: string, record: any, index: number) => (
            <Button
              type='link'
              icon={<PlayCircleOutlined />}
              style={{ padding: '0px' }}
              onClick={() => navigate(`/video/bangumi/play/${record.id}`)}
            >
              {text !== '' ? text : record.orderName}
            </Button>
          )
        },
      ]}
      extraTableActions={(value, record) => (
        <Button
          icon={<UnorderedListOutlined />}
          children={"视频源"}
          onClick={() => navigate(`/video/source/list?vid=${record.videoId}`)}
        />
      )}
    />
  )
}

export default VideoEpisodeTablePage;