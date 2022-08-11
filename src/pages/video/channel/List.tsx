import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { CrudPage } from "../../../components/advanced";
import { getRecords, deleteRecord, deleteRecords } from "../../../api/video/channel";

export interface ChannelListProps {};
const ChannelList: React.FC<ChannelListProps> = (props) => {
  const navigate = useNavigate();
  return (
    <CrudPage
      onAddRecord={() => navigate('/video/channel/edit')}
      onGetRecords={getRecords}
      onUpdateRecord={(_, record) => navigate(`/video/channel/edit/${record.id}`)}
      onDeleteRecord={deleteRecord}
      onDeleteSelectedRecords={deleteRecords}
      tableRowKey={'id'}
      tableColumnsProps={[
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          render: (value: any, record: any, index: number) => (
            <Button type={'link'} onClick={() => navigate(`/video/channel/details/${record.id}`)}>{value}</Button>
          )
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width: 200,
        },
        {
          title: '唯一访问路径',
          dataIndex: 'uniqueAccessPath',
          key: 'uniqueAccessPath',
        },
      ]}
    />
  )
}

export default ChannelList;