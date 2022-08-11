import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Tag, Descriptions, Image } from "antd";
import { CrudPage } from "../../../components/advanced";
import { getRecords, deleteRecord, deleteRecords } from "../../../api/video/source";

export declare type VideoSourceTablePageProps = {};
const VideoSourceTablePage: React.FC<VideoSourceTablePageProps> = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <CrudPage
      onGetRecords={async (key, pageNum, pageSize) => {
        try {
          return Promise.resolve(await getRecords(key, pageNum, pageSize, searchParams.get("vid") || ""))
        } catch (err: any) {
          return Promise.reject(err);
        }
      }}
      onAddRecord={() => navigate(`/video/source/edit?vid=${searchParams.get("vid") || ""}`)}
      onUpdateRecord={(_, record) => navigate(`/video/source/edit/${record.id}`)}
      onDeleteRecord={deleteRecord}
      onDeleteSelectedRecords={deleteRecords}
      tableExpandableProps={{
        expandedRowRender: (record, index, indent, expanded) => (
          <Descriptions column={2} bordered>
            <Descriptions.Item label={"视频截帧"} span={2}>
              <Image src={record.screenshot} width={320} />
            </Descriptions.Item>
            <Descriptions.Item label={"播放地址"} span={2}>
              <span>{record.url}</span>
            </Descriptions.Item>
            <Descriptions.Item label={"创建时间"}>
              <span>{record.createTime}</span>
            </Descriptions.Item>
            <Descriptions.Item label={"最近修改时间"}>
              <span>{record.lastModifyTime}</span>
            </Descriptions.Item>
          </Descriptions>
        ),
      }}
      tableColumnsProps={[
        {
          title: '画质',
          key: 'quality',
          dataIndex: 'quality',
          render: (value) => <Tag>{value}</Tag>
        },
        {
          title: 'Mime类型',
          key: 'mimeType',
          dataIndex: 'mimeType',
          render: (value) => <Tag>{value}</Tag>
        },
        {
          title: '宽度',
          key: 'width',
          dataIndex: 'width',
          render: (value) => <span>{`${value} Pixels`}</span>
        },
        {
          title: '高度',
          key: 'height',
          dataIndex: 'height',
          render: (value) => <span>{`${value} Pixels`}</span>
        },
      ]}
    />
  )
}

export default VideoSourceTablePage;