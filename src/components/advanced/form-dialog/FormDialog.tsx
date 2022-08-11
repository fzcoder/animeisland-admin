import React from 'react';
import { Modal } from 'antd';
import { FormPage, FormItemProps } from '..';

export declare type FormDialogProps = {
  title?: React.ReactNode,
  closable?: boolean,
  destroyOnClose?: boolean,
  visible?: boolean,
  width?: number,
  formData?: Record<string, any>,
  formItemProps?: FormItemProps[],
  onFormDataChange?: (changedValues: any, allValues: any) => void,
  okText?: React.ReactNode,
  cancelText?: React.ReactNode,
  onOk?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  onCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
};

const FormDialog: React.FC<FormDialogProps> = (props) => {
  const {
    title, 
    closable,
    destroyOnClose,
    visible, 
    width,
    formData, 
    formItemProps, 
    onFormDataChange,
    okText,
    cancelText,
    onOk,
    onCancel,
  } = props;
  return (
    <Modal
      title={title}
      closable={ false || closable}
      destroyOnClose={destroyOnClose}
      width={width}
      visible={visible}
      okText={'确定' || okText}
      cancelText={'取消' || cancelText}
      maskClosable={false}
      keyboard={false}
      onOk={onOk}
      onCancel={onCancel}
    >
      <FormPage
        formData={formData}
        formProps={{
          layout: 'vertical',
          formItemsProps: formItemProps,
          preserve: !destroyOnClose,
          onFormDataChange: (changedValues: any, allValues: any) => {
            if (onFormDataChange) {
              onFormDataChange(changedValues, allValues);
            }
          },
        }}
      />
    </Modal>
  )
}

export default FormDialog;