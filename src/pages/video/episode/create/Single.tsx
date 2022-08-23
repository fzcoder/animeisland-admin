import React from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "antd";
import { EditPage } from "../../../../components/advanced";
import { TableSelect } from "../../../../components/select";
import { getInitForm, addForm } from "../../../../api/video/episode";
import { getRecords as getVideoItemRecords } from "../../../../api/video/item";

const VideoEpisodeSingeCreatePage: React.FC<{}> = () => {
  const [searchParams] = useSearchParams();
  const getVideoItemOptions = async (key: string, pagaNum: number, pageSize: number) => {
    try {
      const { total, records } = await getVideoItemRecords(key, pagaNum, pageSize);
      const options: { value: React.Key, label: string }[] = [];
      records.forEach(record => {
        options.push({ value: record.id, label: record.title })
      });
      return Promise.resolve({ total, options });
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
  return (
    <EditPage
      onGetInitFormData={async () => {
        return Promise.resolve(await getInitForm(searchParams.get("bangumi_id")));
      }}
      onSubmitForm={addForm}
      formItemsProps={[
        { name: 'bangumiId', hidden: true, children: <Input disabled /> },
        { name: 'orderName', label: "序列名称", children: <Input /> },
        { name: 'title', label: "标题", children: <Input /> },
        {
          name: 'videoId',
          label: "视频",
          children: (
            <TableSelect
              labelTableTitle="视频标题"
              valueTableTitle="视频ID"
              onGetOptions={getVideoItemOptions}
            />
          )
        }
      ]}
    />
  )
}

export default VideoEpisodeSingeCreatePage;