import React from "react";
import { Form, Space, Button, ButtonProps, FormInstance, Skeleton } from "antd";
import './styles/FormPage.css';

// 表单项属性
export declare type FormItemProps = {
  label?: string,
  name?: string,
  hidden?: boolean,
  valuePropName?: string,
  children?: React.ReactNode,
};

export declare type FormLayout = 'horizontal' | 'inline' | 'vertical';
// 表单属性
export declare type FormProps = {
  form?: FormInstance<any>,
  layout?: FormLayout,
  formItemsProps?: FormItemProps[],
  preserve?: boolean,
  onFormDataChange?: (changedValues: any, allValues: any) => void,
}

export interface BasicFormButtonProps {};
export declare type NativeFormButtonProps = BasicFormButtonProps & ButtonProps;
export declare type FormButtonProps = Partial<NativeFormButtonProps>;

export declare type FormButtonGroupProps = {
  leftExtra?: React.ReactNode,
  buttonGroup?: FormButtonProps[],
}

// 表单页属性
export declare type FormPageProps = {
  className?: string,
  style?: React.CSSProperties,
  header?: React.ReactNode,
  headerClassName?: string,
  headerStyle?: React.CSSProperties,
  contentClassName?: string,
  contentStyle?: React.CSSProperties,
  formData?: Record<string, any>,
  formProps?: FormProps,
  formClassName?: string,
  formStyle?: React.CSSProperties,
  formButtonGroupProps?: FormButtonGroupProps,
  formButtonGroupClassName?: string,
  formButtonGroupStyle?: React.CSSProperties,
  footer?: React.ReactNode,
  footerClassName?: string,
  footerStyle?: React.CSSProperties,
};

const FormPage: React.FC<FormPageProps> = (props) => {
  const {
    className,
    style,
    header,
    headerClassName,
    headerStyle,
    contentClassName,
    contentStyle,
    formData,
    formProps,
    formClassName,
    formStyle,
    formButtonGroupClassName,
    formButtonGroupStyle,
    formButtonGroupProps,
    footer,
    footerClassName,
    footerStyle,
  } = props;
  return (
    <div
      className={
        className ?
        `${className} app-components-advanced-form-page` :
        "app-components-advanced-form-page"
      }
      style={style}
    >
      <Space direction={'vertical'} style={{display: 'flex'}}>
        <div
          className={
            headerClassName ?
            `${headerClassName} app-components-advanced-form-page-header` :
            "app-components-advanced-form-page-header"
          }
          style={headerStyle}
        >
          {header}
        </div>
        <div 
          className={
            contentClassName ?
            `${contentClassName} app-components-advanced-form-page-main` :
            "app-components-advanced-form-page-main"
          }
          style={contentStyle}
        >
          {
            formData ? 
            <Form
              className={formClassName}
              style={formStyle}
              form={formProps?.form}
              layout={formProps?.layout}
              initialValues={formData}
              preserve={formProps?.preserve}
              onValuesChange={(changedValues, allValues) => {
                if (formProps && formProps.onFormDataChange) {
                  formProps.onFormDataChange(changedValues, allValues);
                }
              }}
            >
              {
                formProps?.formItemsProps?.map((item, key) => (
                  <Form.Item
                    key={key}
                    label={item.label}
                    name={item.name}
                    hidden={item.hidden}
                    valuePropName={item.valuePropName || "value"}
                  >
                    {item.children}
                  </Form.Item>
                ))
              }
            </Form>
            :
            <>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </>
          }
          <div
            className={
              formButtonGroupClassName ? 
              `${formButtonGroupClassName} app-components-advanced-form-page-main-btn-gp` :
              "app-components-advanced-form-page-main-btn-gp"
            }
            style={formButtonGroupStyle}
          >
            <div className="app-components-advanced-form-page-main-btn-gp-left">
              {formButtonGroupProps?.leftExtra}
            </div>
            <div className="app-components-advanced-form-page-main-btn-gp-right">
              <Space>
                {
                  formButtonGroupProps?.buttonGroup?.map((item, key) => (
                    <Button
                      key={key}
                      type={item.type}
                      size={item.size}
                      shape={item.shape}
                      icon={item.icon}
                      onClick={item.onClick}
                    >
                      {item.children}
                    </Button>
                  ))
                }
              </Space>
            </div>
          </div>
        </div>
        <div 
          className={
            footerClassName ?
            `${footerClassName} app-components-advanced-form-page-footer` :
            "app-components-advanced-form-page-footer"
          }
          style={footerStyle}
        >
          {footer}
        </div>
      </Space>
    </div>
  )
}

export default FormPage;