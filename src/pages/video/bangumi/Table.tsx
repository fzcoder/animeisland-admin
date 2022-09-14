import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Tag, Image, Descriptions, Space } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { CrudPage } from "../../../components/advanced";
import { getRecords, deleteRecord, deleteRecords } from "../../../api/video/bangumi";
import { getCountryNameByCode } from "../../../api/utils/country";

export declare type VideoBangumiTablePageProps = {};
const VideoBangumiTablePage: React.FC<VideoBangumiTablePageProps> = () => {
  const navigate = useNavigate();
  return (
    <CrudPage
      onAddRecord={() => navigate('/video/bangumi/edit')}
      onGetRecords={getRecords}
      onUpdateRecord={(_, record) => navigate(`/video/bangumi/edit/${record.id}`)}
      onDeleteRecord={deleteRecord}
      onDeleteSelectedRecords={deleteRecords}
      tableExpandableProps={{
        expandedRowRender: (record) => (
          <Descriptions bordered column={2} size={'small'}>
            <Descriptions.Item label="封面" span={2}>
              <Image src={record.cover} width={240} />
            </Descriptions.Item>
            <Descriptions.Item label="原标题">
              <span>{record.originTitle}</span>
            </Descriptions.Item>
            <Descriptions.Item label="所属频道">
              {
                record.channel ?
                <Button type={"link"} onClick={() => navigate(`/video/channel/details/${record.channel.id}`)}>
                  {record.channel.name}
                </Button> :
                <span>无</span>
              }
            </Descriptions.Item>
            <Descriptions.Item label="类型">
              <span>{record.type ? record.type.name : "无"}</span>
            </Descriptions.Item>
            <Descriptions.Item label="分级">
              {
                record.grade ?
                <Image src={record.grade.iconUrl} preview={false} width={128} />
                : <span>无</span>
              }
            </Descriptions.Item>
            <Descriptions.Item label="标签" span={2}>
              <Space>
                {
                  record.tags?.map((item: Record<string, any>, key: number) => (
                    <Tag key={key} color={item.colorHex}>{item.name}</Tag>
                  ))
                }
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              <span>{record.createTime}</span>
            </Descriptions.Item>
            <Descriptions.Item label="最后一次修改时间">
              <span>{record.lastModifyTime}</span>
            </Descriptions.Item>
            <Descriptions.Item label="描述" span={2}>
              <span>{record.description}</span>
            </Descriptions.Item>
          </Descriptions>
        )
      }}
      tableColumnsProps={[
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
          render: (text, record, index) => (
            <Button
              type='link'
              onClick={() => navigate(`/video/bangumi/details/${record.id}`)}
            >{text}</Button>
          )
        },
        {
          title: '上映时间',
          dataIndex: 'releaseDate',
          key: 'releaseDate',
          width: 120
        },
        {
          title: '国家(地区)',
          dataIndex: 'country',
          key: 'country',
          width: 100,
          render: (value) => {
            const { nameZh } = getCountryNameByCode(value);
            return <span>{nameZh || value}</span>
          }
        },
      ]}
      extraTableActions={(value, record, index) => (
        <Button
          icon={<MenuUnfoldOutlined />}
          onClick={() => { navigate(`/video/episode/list?bangumi_id=${record.id}`) }}
        >剧集</Button>
      )}
    />
  )
}

export default VideoBangumiTablePage;