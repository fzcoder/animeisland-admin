import React, {useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import { Button, Space, Modal, Input, message, Divider } from "antd";
import { CheckOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { FormList } from "../../../../components/ui";
import { TablePlus } from "../../../../components/table";
import { getRecords as getVideoRecords } from "../../../../api/video/item";
import { addForms } from "../../../../api/video/episode";

const { Search } = Input;
const VideoSelector: React.FC<{
  open?: boolean,
  onOk?: (selectedRowKeys: any, selectedRows: any) => void,
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void,
}> = ({
  open, onOk, onCancel
}) => {
  const [keyword, setKeyword] = useState<string>("");
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [dataSource, setDataSource] = useState<object[]>([]);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const onGetRecords = async (keyword: string, pageNum: number, pageSize: number) =>  {
    try {
      const { total, records } = await getVideoRecords(keyword, pageNum, pageSize);
      setTotal(total);
      setDataSource(records);
    } catch (err: any) {
      message.error(err);
    }
  }
  useEffect(() => {
    onGetRecords(keyword, pageNum, pageSize);
  },[]);
  return (
    <Modal
      visible={open}
      onCancel={onCancel}
      onOk={() => {
        onOk && onOk(selectedRowKeys, selectedRows);
      }}
      width={960}
      maskClosable={false}
      title={"选择视频"}
      keyboard={false}
      closable={false}
      bodyStyle={{height: "500px", overflow: "auto"}}
    >
      <Space direction={"vertical"} style={{display: "flex"}}>
        <Search
          size={"small"}
          onSearch={(value) => {
            setKeyword(value)
            onGetRecords(value, pageNum, pageSize);
          }}
        />
        <TablePlus
          dataSource={dataSource}
          size={"small"}
          rowKey={"id"}
          columns={[
            { key: "id", dataIndex: "id", title: "视频ID" },
            {
              key: "title",
              dataIndex: "title",
              title: "标题",
              sorter: (a, b) => a.title.localeCompare(b.title),
              sortDirections: ['ascend'],
            },
          ]}
          pagination={{
            current: pageNum,
            pageSize,
            total,
            showQuickJumper: true,
            showSizeChanger: true,
            onChange(page, pageSize) {
              setPageNum(page)
              setPageSize(pageSize)
              onGetRecords(keyword, page, pageSize)
            },
          }}
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
              setSelectedRowKeys(selectedRowKeys);
              setSelectedRows(selectedRows);
            }
          }}
        />
      </Space>
    </Modal>
  )
}

const VideoEpisodeMultipleCreatePage: React.FC<{}> = ({}) => {
  const [showSelector, setShowSelector] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<Record<string, any>[]>([]);
  const [showForms, setShowForms] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  return (
    <>
      <VideoSelector
        open={showSelector}
        onOk={(_, selectedRows) => {
          const forms = []
          selectedRows.forEach((row: any, index: number) => {
            forms.push({
              bangumiId: searchParams.get("bangumi_id") || "",
              videoId: row["id"],
              orderName: `第${index+1}话`,
              title: row["title"],
            })
          });
          setDataSource(forms)
          setShowSelector(false)
        }}
        onCancel={() => setShowSelector(false)}
      />
      <Space direction={"vertical"} style={{display: "flex"}}>
        <div style={{display: "flex", "alignItems": "center", "justifyContent": "space-between"}}>
          <Space>
            <Button
              icon={<PlusOutlined />}
              children={"选择视频"}
              disabled={dataSource.length > 0}
              onClick={() => setShowSelector(true)}
            />
          </Space>
          <Space>
            <Button
              type={"primary"}
              icon={<CheckOutlined />}
              children={"上传"}
              disabled={dataSource.length === 0}
              onClick={async () => {
                try {
                  await addForms(dataSource);
                  message.success("添加成功!");
                } catch(err: any) {
                  message.error(err)
                }
              }}
            />
            <Button
              type={"primary"}
              danger
              icon={<DeleteOutlined />}
              disabled={dataSource.length === 0}
              children={"清空"}
              onClick={() => setDataSource([])}
            />
          </Space>
        </div>
        <Divider />
        {
          showForms &&
          <FormList
            dataSource={dataSource}
            formLayout={"vertical"}
            onValuesChange={(_, allValues, index) => {
              const _dataSource = dataSource;
              _dataSource[index] = {...allValues};
              setDataSource(_dataSource);
            }}
            formItems={[
              { name: 'bangumiId', hidden: true, children: <Input disabled /> },
              { name: 'orderName', label: "序列名称", children: <Input allowClear/> },
              { name: 'title', label: "标题", children: <Input allowClear/> },
              { name: 'videoId', label: "视频ID", children: <Input disabled />}
            ]}
          />
        }
      </Space>
    </>
  )
}

export default VideoEpisodeMultipleCreatePage;