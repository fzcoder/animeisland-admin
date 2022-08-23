import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CrudPage } from '../../../components/advanced';
import { getRecords, deleteRecord, deleteRecords } from '../../../api/video/series';

const VideoSeriesTablePage: React.FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <CrudPage
      onAddRecord={() => navigate(`/video/series/edit`)}
      onGetRecords={getRecords}
      onUpdateRecord={(_, record) => navigate(`/video/series/edit/${record.id}`) }
      onDeleteRecord={deleteRecord}
      onDeleteSelectedRecords={deleteRecords}
      tableColumnsProps={[
        {
          key: 'name',
          dataIndex: 'name',
          title: '名称',
          render: (value, record) => (
            <Button
              type={"link"}
              onClick={() => navigate(`/video/series/details/${record.id}`)}
            >{value}</Button>
          )
        },
        {
          key: 'createTime',
          dataIndex: 'createTime',
          title: '创建时间',
          width: 200
        },
      ]}
    />
  )
}

export default VideoSeriesTablePage;