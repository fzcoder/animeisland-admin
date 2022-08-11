import React from "react";
import { Input } from 'antd';
import { PictureOutlined } from "@ant-design/icons";

export declare type SingleImageUploadProps = {
  width?: number,
  height?: number,
  value?: string,
  defaultInputMode?: boolean,
  onChange?: (value: string) => void,
};

const SingleImageUpload: React.FC<SingleImageUploadProps> = (props) => {
  const { value, onChange, } = props;
  const triggerChange = (changedValue: string) => {
    onChange?.(changedValue);
  }

  return (
    <Input
      value={value}
      addonBefore={<PictureOutlined />}
      allowClear
      onChange={(e: any) => {
        triggerChange(e.target.value);
      }}
    />
  )
}

export default SingleImageUpload;