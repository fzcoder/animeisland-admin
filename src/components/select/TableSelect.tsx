import React, { useEffect, useState } from "react";
import { Input, Space, Card, message } from "antd";
import { TablePlus } from "../table";

const { Search } = Input;

export declare type OptionsProps = { value: React.Key, label: string }[]
export declare type TableSelectProps = {
  labelTableTitle?: string,
  onChange?: (value?: React.Key) => void,
  onGetOptions?: (key: string, pagaNum: number, pageSize: number) => Promise<{total: number, options: OptionsProps}>,
  value?: React.Key,
  valueTableTitle?: string,
}
const TableSelect: React.FC<TableSelectProps> = (props) => {
  const {
    labelTableTitle,
    onChange,
    onGetOptions,
    value,
    valueTableTitle,
  } = props;
  const [options, setOptions] = useState<OptionsProps>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [pagaNum, setPageNum] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const triggerChange = (value: React.Key) => {
    if (onChange) {
      onChange(value);
    }
  }
  const getOptions = async (keyword: string, pagaNum: number, pageSize: number) => {
    if (onGetOptions) {
      try {
        const { total: _total, options: _options } = await onGetOptions(keyword, pagaNum, pageSize);
        setTotal(_total);
        setOptions(_options);
      } catch (err: any) {
        message.error(err);
      }
    }
  }
  useEffect(() => {
    getOptions(keyword, pagaNum, pageSize);
  }, [])
  return (
    <Card>
      <Space direction={"vertical"} style={{ display: "flex" }}>
        <Search
          size={"small"}
          onSearch={(value) => {
            setKeyword(value);
            getOptions(value, pagaNum, pageSize);
          }}
        />
        <TablePlus
          columns={[
            {
              key: 'label',
              dataIndex: 'label',
              title: labelTableTitle || '标签'
            },
            {
              key: 'value',
              dataIndex: 'value',
              title: valueTableTitle || '值'
            }
          ]}
          dataSource={options}
          pagination={{
            current: pagaNum,
            pageSize,
            showQuickJumper: true,
            showTotal: (total: number) => `共 ${total} 条记录`,
            total,
            onChange: (page, _) => {
              setPageNum(page);
              getOptions(keyword, page, pageSize);
            }
          }}
          rowKey={"value"}
          rowSelection={{
            type: "radio",
            onChange: (selectedRowsKeys) => triggerChange(selectedRowsKeys[0])
          }}
          size={"small"}
        />
      </Space>
    </Card>
  )
}

export default TableSelect;