import React, { useState, useEffect } from 'react';
import { Button, Space, Input } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { SpinProps } from 'antd/lib/spin';
import { TablePlus } from '../../table';
import type { TablePlusDraggableConfig } from "../../table";
import "./styles/TablePage.css";

const { Search } = Input;

type DefaultRecordType = Record<string, any>;
export declare type TableColumnsTypeAlign = "left" | "right" | "center";

export declare type TableColumnsType = {
  align?: TableColumnsTypeAlign,
  dataIndex?: string | string[],
  key?: string,
  render?: (value: any, record: any, index: number) => React.ReactNode,
  title?: string,
  width?: string | number,
};

export declare type TableExpandable = {
  expandedRowRender?: (record: any, index: number, indent: number, expanded: boolean) => React.ReactNode,
};

export type NativeSelectionButtonProps = {
  onClick?: (selectedRowKeys: any[], selectedRows: any[]) => void
} & Omit<ButtonProps, 'onClick'>

export type SelectionButtonProps = Partial<NativeSelectionButtonProps>

export declare type TableSelectionProps = {
  selectionButtonsProps?: SelectionButtonProps[]
};

export declare type TablePaginationProps = {
  total?: number,
  size?: 'default' | 'small',
  onChange?: (pageNum: number, pageSize: number) => void,
};

export declare type TableSize = 'small' | 'middle' | 'large';

export declare type TableProps = {
  bordered?: boolean,
  columns?: TableColumnsType[],
  dataSource?: object[],
  expandable?: TableExpandable,
  loading?: boolean | SpinProps,
  pagination?: TablePaginationProps,
  rowKey?: string,
  selectionProps?: TableSelectionProps,
  size?: TableSize,
  draggable?: boolean,
  dragConfig?: TablePlusDraggableConfig<DefaultRecordType>,
  /** @deprecated This prop will be deprecated in v0.1.0 */
  onUpdateQueryOptions?: (keyword: string, pageNum: number, pageSize: number) => void
}

export declare type ToolbarProps = {
  leftExtra?: React.ReactNode,
  onSearch?: (value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement> | undefined) => void,
};

export declare type TablePageProps = {
  header?: React.ReactNode,
  headerClassName?: string,
  toolbarProps?: ToolbarProps,
  tableProps?: TableProps,
  footer?: React.ReactNode,
  footerClassName?: string,
};

const TablePage: React.FC<TablePageProps> = (props) => {
  const {
    header, 
    headerClassName, 
    toolbarProps,
    tableProps, 
    footer, 
    footerClassName,
  } = props;
  // query options
  const [keyword, setKeyword] = useState<string>('');
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const tablePaginationProps = {
    current: pageNum,
    pageSize: pageSize,
    total: tableProps?.pagination?.total,
    size: tableProps?.pagination?.size,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条记录`, 
    onChange: (pageNum: number, pageSize: number) => {
      setPageNum(pageNum);
      setPageSize(pageSize);
      if (tableProps?.pagination?.onChange) {
        tableProps.pagination.onChange(pageNum, pageSize);
      }
      if (tableProps?.onUpdateQueryOptions) {
        tableProps?.onUpdateQueryOptions(keyword, pageNum, pageSize);
      }
    },
  }
  // const [total, setTotal] = useState<number>(0);
  // selections options
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const tableRowSelectionProps = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    }
  }
  useEffect(() => {
    if (tableProps?.onUpdateQueryOptions) {
      tableProps.onUpdateQueryOptions(keyword, pageNum, pageSize);
    }
  }, []);
  // render
  return (
    <div className={headerClassName || 'app-components-advanced-list-page'}>
      <Space direction={'vertical'} style={{display: 'flex'}}>
        <div className='app-components-advanced-table-page'>{header}</div>
        <div className='app-components-advanced-table-page-main'>
          <Space direction={'vertical'} style={{display: 'flex'}}>
            <div className='app-components-advanced-table-page-main-toolbar'>
              {
                toolbarProps && [
                  <div key={0}>
                    <Space>
                      <>{toolbarProps.leftExtra}</>
                      <>
                        {tableProps?.selectionProps?.selectionButtonsProps?.map((item, index) => {
                          const { children, disabled, onClick, ...restProps } = item;
                          return (
                            <Button
                              key={'_selected_button_' + index}
                              onClick={() => {
                                if (onClick) {
                                  onClick(selectedRowKeys, selectedRows);
                                }
                              }}
                              disabled={
                                (disabled !== undefined ? disabled : selectedRowKeys.length < 1) 
                                || tableProps.draggable
                              }
                              {...restProps}
                            >
                              {children}
                            </Button>
                          )
                        })}
                      </>
                    </Space>
                  </div>,
                  <div key={1}>
                    <Search
                      placeholder={'please input keyword'}
                      style={{ width: 250 }}
                      size={'middle'}
                      disabled={tableProps.draggable}
                      onSearch={(value, event) => {
                        setKeyword(value);
                        if (toolbarProps.onSearch) {
                          toolbarProps.onSearch(value, event);
                        }
                        if (tableProps?.onUpdateQueryOptions) {
                          tableProps.onUpdateQueryOptions(value, pageNum, pageSize);
                        }
                      }}
                    />
                  </div>
                ]
              }
            </div>
            <TablePlus
              bordered={tableProps?.bordered}
              columns={tableProps?.columns}
              dataSource={tableProps?.dataSource}
              expandable={tableProps?.expandable}
              loading={tableProps?.loading}
              pagination={
                (tableProps?.pagination && !tableProps.draggable)? tablePaginationProps : false
              }
              rowKey={tableProps?.rowKey}
              rowSelection={
                (tableProps?.selectionProps && !tableProps.draggable)? tableRowSelectionProps : undefined
              }
              size={tableProps?.size}
              draggable={
                tableProps.draggable ? tableProps.dragConfig : false
              }
            />
          </Space>
        </div>
        <div className={footerClassName || 'app-components-advanced-list-page'}>{footer}</div>
      </Space>
    </div>
  )
}

export default TablePage;