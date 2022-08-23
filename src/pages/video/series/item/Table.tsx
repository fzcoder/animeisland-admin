import React, { useEffect, useState } from "react";
import { Input, message } from "antd";
import { useParams } from "react-router-dom";
import { CrudPage } from "../../../../components/advanced";
import { SearchSelect } from "../../../../components/select";
import { getBangumiList } from "../../../../api/video/bangumi";
import {
  addSeriesItem,
  getSeriesItemRecords,
  updateSeriesItemForm,
  updateSeriesItemsOrderInSeries,
  deleteSeriesItemRecord,
  deleteSeriesItemRecords
} from "../../../../api/video/series";

type Options = {
  value: string | number,
  label: string,
}
const VideoSeriesItemTablePage: React.FC<{}> = () => {
  const params = useParams();
  const [bangumiOptions, setBangumiOptions] = useState<Options[]>([]);
  const getBangumiOptions = async (key: string) => {
    try {
      const list = await getBangumiList({key});
      const _bangumiOptions: Options[] = [];
      list.forEach(item => {
        _bangumiOptions.push({ value: item.id, label: item.title });
      });
      setBangumiOptions(_bangumiOptions);
    } catch (err: any) {
      message.error(err);
    }
  }
  useEffect(() => {
    getBangumiOptions("")
  }, [])
  return (
    <CrudPage
      showTableDraggableButton
      onGetRecords={(key, page, size) => {
        return getSeriesItemRecords(key, page, size, params.id)
      }}
      onDeleteRecord={deleteSeriesItemRecord}
      onDeleteSelectedRecords={deleteSeriesItemRecords}
      onFinishDrag={async (newData) => {
        try {
          newData.forEach((item, index) => {
            item['orderInSeries'] = index + 1
          });
          await updateSeriesItemsOrderInSeries(newData);
        } catch (err: any) {
          return Promise.reject(err);
        }
      }}
      useAddFormDialog
      addFormTitle={"添加系列"}
      beforeOpenAddFormDialog={() => {
        return Promise.resolve({
          "seriesId": params.id,
          "name": "",
          "bangumiId": ""
        })
      }}
      onSubmitAddForm={addSeriesItem}
      addFormItemProps={[
        { name: 'seriesId', hidden: true, children: <Input /> },
        { name: 'name', label: '名称', children: <Input placeholder="请输入系列项名称" /> },
        {
          name: 'bangumiId',
          label: '番剧',
          children: (
            <SearchSelect
              placeholder="请输入番剧标题关键字"
              options={bangumiOptions}
              onSearch={getBangumiOptions}
            />
          )
        },
      ]}
      useUpdateFormDialog
      updateFormTitle={"修改系列项"}
      onSubmitUpdateForm={updateSeriesItemForm}
      updateFormItemProps={[
        { name: 'id', hidden: true, children: <Input /> },
        { name: 'name', label: '名称', children: <Input placeholder="请输入系列项名称" /> },
        {
          name: 'bangumiId',
          label: '番剧',
          children: (
            <SearchSelect
              placeholder="请输入番剧标题关键字"
              options={bangumiOptions}
              onSearch={getBangumiOptions}
            />
          )
        },
      ]}
      tableColumnsProps={[
        {
          key: 'name',
          dataIndex: 'name',
          title: '名称',
        },
        {
          key: 'createTime',
          dataIndex: 'createTime',
          title: '创建时间',
          width: 200,
        },
      ]}
    />
  )
}

export default VideoSeriesItemTablePage;