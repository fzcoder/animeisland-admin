import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, FormInstance } from 'antd';
import { FormPage, FormProps, FormButtonGroupProps, FormItemProps } from '../../../components/advanced';
import "./styles/edit-page.css";

export declare type EditPageProps = {
  className?: string,
  style?: React.CSSProperties,
  header?: React.ReactNode,
  headerClassName?: string,
  headerStyle?: React.CSSProperties,
  contentClassName?: string,
  contentStyle?: React.CSSProperties,
  footer?: React.ReactNode,
  footerClassName?: string,
  footerStyle?: React.CSSProperties,
  formClassName?: string,
  formStyle?: React.CSSProperties,
  formHook?: FormInstance<any>,
  formItemsProps?: FormItemProps[],
  formButtonGroupClassName?: string,
  formButtonGroupStyle?: React.CSSProperties,
  updateFormHook?: FormInstance<any>,
  updateFormItemsProps?: FormItemProps[],
  updateMode?: boolean,
  initFormData?: Record<string, any>,
  updateRecordKey?: string | number,
  onGetInitFormData?: () => Promise<Record<string, any>>,
  onGetInitUpdateFormData?: (key?: string | number) => Promise<Record<string, any>>,
  onSubmitForm?: (form: Record<string, any>) => Promise<void>,
  onUpdateForm?: (form: Record<string, any>) => Promise<void>,
  onCancel?: () => void,
  onUpdateModeCancel?: () => void,
}

const EditPage: React.FC<EditPageProps> = (props) => {
  const {
    className,
    style,
    header,
    headerClassName,
    headerStyle,
    contentClassName,
    contentStyle,
    footer,
    footerClassName,
    footerStyle,
    formClassName,
    formStyle,
    formHook,
    formItemsProps,
    formButtonGroupClassName,
    formButtonGroupStyle,
    updateFormHook,
    updateFormItemsProps,
    initFormData,
    updateMode,
    updateRecordKey,
    onGetInitFormData,
    onGetInitUpdateFormData,
    onSubmitForm,
    onUpdateForm,
    onCancel,
    onUpdateModeCancel,
  } = props;
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, any> | undefined>(undefined);
  const formProps: FormProps = {
    form: formHook,
    layout: 'vertical',
    formItemsProps: formItemsProps,
    onFormDataChange: (_, allValues) => {
      setFormData(allValues);
    },
  }
  const updateFormProps: FormProps = {
    form: updateFormHook,
    layout: 'vertical',
    formItemsProps: updateFormItemsProps,
    onFormDataChange: (changedValues, allValues) => {
      setFormData(allValues);
    },
  }
  const formButtonGroupProps: FormButtonGroupProps = {
    buttonGroup: [
      {
        type: 'primary',
        children: '提交',
        onClick: async () => {
          try {
            await onSubmitForm?.(formData || {});
            message.success("提交成功!");
          } catch(err: any) {
            message.error(err);
          }
        },
      },
      {
        children: '取消',
        onClick: () => {
          if (onCancel) onCancel();
          else navigate(-1);
        },
      },
    ],
  }
  const updateFormButtonGroupProp: FormButtonGroupProps = {
    buttonGroup: [
      {
        type: 'primary',
        children: '更新',
        onClick: async () => {
          try {
            await onUpdateForm?.(formData || {});
            message.success("修改成功!");
          } catch(err: any) {
            message.error(err);
          }
        },
      },
      {
        children: '取消',
        onClick: () => {
          if (onUpdateModeCancel) onUpdateModeCancel();
          else navigate(-1);
        },
      },
    ],
  }
  useEffect(() => {
    if (updateMode) {
      (async () => {
        try {
          const initialformData = await onGetInitUpdateFormData?.(updateRecordKey) || initFormData;
          setFormData(initialformData);
        } catch (err: any) {
          message.error(err);
        }
      })();
    } else {
      (async () => {
        try {
          const initialformData = await onGetInitFormData?.() || initFormData;
          setFormData(initialformData);
        } catch (err: any) {
          message.error(err);
        }
      })();
    }
  }, []);
  return (
    <FormPage
      className={className}
      style={style}
      header={header}
      headerClassName={headerClassName}
      headerStyle={headerStyle}
      contentClassName={contentClassName}
      contentStyle={contentStyle}
      footer={footer}
      footerClassName={footerClassName}
      footerStyle={footerStyle}
      formClassName={formClassName}
      formStyle={formStyle}
      formData={formData}
      formProps={updateMode ? updateFormProps : formProps}
      formButtonGroupClassName={formButtonGroupClassName}
      formButtonGroupStyle={formButtonGroupStyle}
      formButtonGroupProps={updateMode ? updateFormButtonGroupProp : formButtonGroupProps}
    />
  )
}

export default EditPage;

