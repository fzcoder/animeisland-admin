import React from "react";
import { List, Form, Divider } from 'antd';
import type { ListProps, FormProps, FormItemProps } from "antd";

export declare type FormListProps<T> = {
  dataSource?: ListProps<T>["dataSource"],
  formLayout?: FormProps["layout"],
  formItems?: FormItemProps[],
  onValuesChange?: (changedValues: any, allValues: any, index: number) => void,
};
const FormList: React.FC<FormListProps<Record<string, any>>> = ({
  dataSource,
  formLayout,
  formItems,
  onValuesChange
}) => {
  return (
    <List
      dataSource={dataSource}
      renderItem={(item, index) => {
        return (
          <>
            <Form
              initialValues={item}
              layout={formLayout}
              onValuesChange={(changedValues, allValues) => {
                onValuesChange && onValuesChange(changedValues, allValues, index);
              }}
            >
              {
                formItems && formItems.map((formItem, i) => (
                  <Form.Item key={i} {...formItem} />
                ))
              }
            </Form>
            <Divider />
          </>
        )
      }}
    />
  )
}

export default FormList;