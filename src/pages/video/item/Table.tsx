import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Image, Descriptions, Tag, Space } from 'antd';
import { UnorderedListOutlined } from "@ant-design/icons"
import { CrudPage } from "../../../components/advanced";
import { getRecords, deleteRecord, deleteRecords } from "../../../api/video/item";

export interface VideoItemTablePageProps {};
const VideoItemTablePage: React.FC<VideoItemTablePageProps> = ({}) => {
  const navigate = useNavigate();
  return (
    <CrudPage
      onAddRecord={() => navigate('/video/item/upload')}
      onGetRecords={getRecords}
      onUpdateRecord={(_, record) => navigate(`/video/item/edit/${record.id}`)}
      onDeleteRecord={deleteRecord}
      onDeleteSelectedRecords={deleteRecords}
      tableRowKey={'id'}
      tableColumnsProps={[
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
          render: (text, record, index) => (
            <Button
              type='link'
              onClick={() => {
                navigate(`/video/item/play/${record.id}`)
              }}
            >{text}</Button>
          )
        },
      ]}
      extraTableActions={(value, record) => (
        <Button
          icon={<UnorderedListOutlined />}
          children={"视频源"}
          onClick={() => navigate(`/video/source/list?vid=${record.id}`)}
        />
      )}
      tableExpandableProps={{
        expandedRowRender: (record, index, indent, expanded) => (
          <Descriptions column={2} bordered>
            <Descriptions.Item label={"封面"} span={2}>
              <Image src={record.poster} width={320} />
            </Descriptions.Item>
            <Descriptions.Item label={"画质"} span={2}>
              <Space align={"baseline"}>
                {record.srcList.map((src: Record<string,any>, index: number) => (
                  <Tag key={index}>{src.quality}</Tag>
                ))}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={"描述"} span={2}>
              <span>{record.description}</span>
            </Descriptions.Item>
            <Descriptions.Item label={"创建时间"}>
              <span>{record.createTime}</span>
            </Descriptions.Item>
            <Descriptions.Item label={"最近修改时间"}>
              <span>{record.lastModifyTime}</span>
            </Descriptions.Item>
          </Descriptions>
        )
      }}
    />
  )
}

export default VideoItemTablePage;