import React, { useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space, Modal, message } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  DragOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { TablePage, FormDialog, FormItemProps } from "..";
import {
  TableColumnsType,
  TableExpandable,
  SelectionButtonProps as TableSelectionButtonProps
} from "../table-page";
import { arrayMoveImmutable } from 'array-move';

const { confirm } = Modal;

export declare type PageResultSet = {
  total: number,
  records: object[],
}

export declare type CrudPageProps = {
  header?: React.ReactNode,
  footer?: React.ReactNode,
  showAddRecordButton?: boolean,
  toolbarLeftExtra?: React.ReactNode,
  showTableActionsColumn?: boolean,
  showTableDraggableButton?: boolean,
  tableActionsColumnWidth?: number,
  tableColumnsProps?: TableColumnsType[],
  tableExpandableProps?: TableExpandable,
  tableSelectionButtonProps?: TableSelectionButtonProps[],
  tableRowKey?: string,
  useAddFormDialog?: boolean,
  addFormTitle?: React.ReactNode,
  addFormItemProps?: FormItemProps[],
  beforeOpenAddFormDialog?: () => Promise<Record<string, any>>,
  onSubmitAddForm?: (form: Record<string, any>) => Promise<any>,
  useUpdateFormDialog?: boolean,
  updateFormTitle?: React.ReactNode,
  updateFormItemProps?: FormItemProps[],
  onFinishDrag?: (newData: object[]) => Promise<any>,
  beforeOpenUpdateFormDialog?: (value: any, record: any, index: number) => Promise<Record<string, any>>,
  onSubmitUpdateForm?: (form: Record<string, any>) => Promise<any>,
  extraTableActions?: (value: any, record: any, index: number) => React.ReactNode,
  onAddRecord?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  onGetRecords?: (keyword: string, pageNum: number, pageSize: number) => Promise<PageResultSet>,
  onUpdateRecord?: (value: any, record: any, index: number) => void,
  onDeleteRecord?: (value: any, record: any, index: number) => Promise<any>,
  onDeleteSelectedRecords?: (selectedRowKeys: any[], selectedRows: any[]) => Promise<any>,
};

const CrudPage: React.FC<CrudPageProps> = (props) => {
  const {
    header,
    footer,
    showAddRecordButton,
    showTableDraggableButton,
    toolbarLeftExtra,
    showTableActionsColumn,
    tableActionsColumnWidth,
    tableColumnsProps,
    tableExpandableProps,
    tableSelectionButtonProps,
    tableRowKey,
    useAddFormDialog,
    addFormTitle,
    addFormItemProps,
    beforeOpenAddFormDialog,
    onSubmitAddForm,
    useUpdateFormDialog,
    updateFormTitle,
    updateFormItemProps,
    beforeOpenUpdateFormDialog,
    onSubmitUpdateForm,
    extraTableActions,
    onAddRecord,
    onGetRecords,
    onUpdateRecord,
    onDeleteRecord,
    onDeleteSelectedRecords,
    onFinishDrag,
  } = props;
  const navigate = useNavigate();
  const [finishInit, setFinishInit] = useState<boolean>(false);
  // datasource
  const [dataSource, setDataSource] = useState<object[]>();
  const [total, setTotal] = useState<number>(0);
  // search params
  const [keyword, setKeyword] = useState<string>('');
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  // tabel
  const [tableColumns, setTableColumns] = useState<TableColumnsType[] | undefined>(tableColumnsProps);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // add form
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [addFormData, setAddFormData] = useState<Record<string, any> | undefined>(undefined);
  // update form
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const [updateFormData, setUpdateFormData] = useState<Record<string, any> | undefined>(undefined);
  // draggable
  const [tableDraggable, setTableDraggable] = useState<boolean>(false);
  const [draggedDataSource, setDraggedDataSource] = useState<object[]>([]);
  // 获取记录
  const getRecords = async (keyword: string, pageNum: number, pageSize: number) => {
    if (onGetRecords) {
      try {
        setIsLoading(true);
        const { total, records } = await onGetRecords(keyword, pageNum, pageSize);
        setIsLoading(false);
        setDataSource(records);
        setTotal(total);
      } catch (err: any) {
        setIsLoading(false);
        message.error(err);
        setDataSource([]);
        setTotal(0);
      }
    }
  }
  // 删除选中记录
  const deleteSelectedRecords = (selectedRowKeys: any[], selectedRows: any[]) => {
    if (onDeleteSelectedRecords) {
      onDeleteSelectedRecords(selectedRowKeys, selectedRows)
      .then((_ => {
        getRecords(keyword, pageNum, pageSize);
        message.success('删除成功');
      }))
      .catch((err => {
        message.error(err);
      }));
    }
  }
  // 删除记录
  const deleteRecord = (value: any, record: any, index: number) => {
    if (onDeleteRecord) {
      onDeleteRecord(value, record, index)
      .then((_ => {
        getRecords(keyword, pageNum, pageSize);
        message.success('删除成功');
      }))
      .catch((err => {
        message.error(err);
      }));
    }
  }
  // 开启操作列
  const tableColumnsWithActions = () => {
    if (tableColumnsProps === undefined) return;
    const action = {
      title: '操作',
      key: 'action',
      width: tableActionsColumnWidth || 200,
      render: (value: any, record: any, index: number) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            type={'link'} 
            size={'small'}
            onClick={() => {
              if (useUpdateFormDialog) { // 如果使用FormDialog
                if (beforeOpenUpdateFormDialog) { 
                  beforeOpenUpdateFormDialog(value, record, index)
                  .then(form => {
                    setUpdateFormData(form);
                    setShowUpdateForm(true);
                  })
                  .catch(err => {
                    message.error(err);
                  });
                } else {
                  setUpdateFormData(record);
                  setShowUpdateForm(true);
                }
              } else if (onUpdateRecord) { // 普通模式
                if (typeof onUpdateRecord === 'string') {
                  navigate(onUpdateRecord);
                } else {
                  onUpdateRecord(value, record, index);
                }
              }
            }}
          >编辑</Button>
          <Button 
            icon={<DeleteOutlined />} 
            type={'link'} 
            size={'small'} 
            danger
            onClick={() => {
              confirm({
                title: '确定要删除所选记录吗?',
                icon: <ExclamationCircleOutlined />,
                onOk: () => deleteRecord(value, record, index),
                okText: "确定",
                cancelText: "取消",
              })
            }}
          >删除</Button>
          {extraTableActions && extraTableActions(value, record, index)}
        </Space>
      )
    }
    const _tableColumns = [...tableColumnsProps, action];
    setTableColumns(_tableColumns);
  }
  const tableColumnsWithoutActions = () => {
    if (tableColumnsProps === undefined) return;
    const _tableColumns = [...tableColumnsProps];
    setTableColumns(_tableColumns);
  }
  // 提交创建表单
  const submitAddForm = async (form: Record<string, any>) => {
    if (onSubmitAddForm) {
      onSubmitAddForm(form)
      .then((_) => {
        message.success('添加成功');
        getRecords(keyword, pageNum, pageSize);
      })
      .catch((err) => {
        message.error(err);
      })
    }
  }
  // 提交修改表单
  const submitUpdateForm = (form: Record<string, any>) => {
    if (onSubmitUpdateForm) {
      onSubmitUpdateForm(form)
      .then((_) => {
        message.success('修改成功');
        getRecords(keyword, pageNum, pageSize);
      })
      .catch((err) => {
        message.error(err);
      })
    }
  }
  // 处理完成拖拽排序事件
  const handleFinishDragEvent = async () => {
    try {
      if (onFinishDrag) {
        await onFinishDrag(dataSource);
        await getRecords(keyword, pageNum, pageSize);
      }
    } catch (err: any) {
      message.error(err);
    }
  }
  // 初始化
  useEffect(() => {
    if (showTableActionsColumn || showTableActionsColumn === undefined) {
      tableColumnsWithActions();
    }
    getRecords(keyword, pageNum, pageSize);
    setFinishInit(true);
  }, []);
  useEffect(() => {
    if (finishInit) {
      if (tableDraggable) {
        tableColumnsWithoutActions();
        getRecords("", 1, total);
      } else {
        tableColumnsWithActions();
        if (!onFinishDrag) {
          getRecords(keyword, pageNum, pageSize);
        }
      }
    }
  }, [tableDraggable])
  // render
  return (
    <>
      {/* Add Form  */}
      <FormDialog
        closable={false}
        destroyOnClose
        title={addFormTitle}
        visible={showAddForm}
        formData={addFormData}
        formItemProps={addFormItemProps}
        onFormDataChange={(changedValue, allValues) => {
          setAddFormData(allValues);
        }}
        onOk={() => {
          if (addFormData) {
            submitAddForm(addFormData);
          }
          setShowAddForm(false);
        }}
        okText={"添加"}
        onCancel={() => setShowAddForm(false)}
        cancelText={"取消"}
      />
      {/* Update Form  */}
      <FormDialog
        closable={false}
        destroyOnClose
        title={updateFormTitle}
        visible={showUpdateForm}
        formData={updateFormData}
        formItemProps={updateFormItemProps}
        onFormDataChange={(changedValue, allValues) => {
          setUpdateFormData(allValues);
        }}
        onOk={() => {
          if (updateFormData) {
            submitUpdateForm(updateFormData);
          }
          setShowUpdateForm(false);
        }}
        okText={"修改"}
        onCancel={() => setShowUpdateForm(false)}
        cancelText={"取消"}
      />
      {/* Table  */}
      <TablePage
        header={header}
        footer={footer}
        toolbarProps={{
          leftExtra: (
            <Space>
              <>
                {
                  (showAddRecordButton || showAddRecordButton === undefined) &&
                  <Button
                    icon={<PlusOutlined/>}
                    type={'primary'}
                    disabled={tableDraggable}
                    onClick={(event) => {
                      if (useAddFormDialog) { // 如果使用FormDialog
                        if (beforeOpenAddFormDialog) { // 钩子函数, 用于自定义表单初始值
                          beforeOpenAddFormDialog()
                          .then(form => {
                            setAddFormData(form);
                            setShowAddForm(true);
                          })
                          .catch(err => {
                            message.error(err);
                          });
                        } else {
                          setShowAddForm(true);
                        }
                      } else if (onAddRecord) { // 普通模式
                        if (typeof onAddRecord === 'string' ) {
                          navigate(onAddRecord);
                        } else {
                          onAddRecord(event);
                        }
                      }
                    }}
                  >添加</Button>
                }
                {
                  showTableDraggableButton &&
                  <Button
                    icon={tableDraggable ? <CheckOutlined /> : <DragOutlined />}
                    children={tableDraggable ? "完成排序" : "拖拽排序"}
                    onClick={() => {
                      const currentStatus = tableDraggable;
                      setTableDraggable(!tableDraggable);
                      if (currentStatus) {
                        handleFinishDragEvent();
                      }
                    }}
                  />
                }
              </>
              {toolbarLeftExtra}
            </Space>
          ),
          onSearch: (value) => {
            setKeyword(value);
            getRecords(value, pageNum, pageSize);
          }
        }}
        tableProps={{
          columns: tableColumns,
          dataSource: dataSource,
          expandable: tableExpandableProps,
          selectionProps: {
            selectionButtonsProps: [
              {
                type: 'primary',
                danger: true,
                icon: <DeleteOutlined />,
                children: <>删除</>,
                onClick: (selectedRowKeys: any[], selectedRows: any[]) => {
                  confirm({
                    title: '是否删除所选记录?',
                    icon: <ExclamationCircleOutlined />,
                    onOk: () => {
                      if (onDeleteSelectedRecords) {
                        deleteSelectedRecords(selectedRowKeys, selectedRows);
                      }
                    },
                    okText: "确定",
                    cancelText: "取消",
                  })
                }
              },
              ...tableSelectionButtonProps || [],
            ]
          },
          loading: {
            spinning: isLoading,
            tip: 'loading...'
          },
          pagination: {
            total: total,
            onChange: (pageNum, pageSize) => {
              setPageNum(pageNum);
              setPageSize(pageSize);
              getRecords(keyword, pageNum, pageSize);
            }
          },
          rowKey: tableRowKey || 'id',
          draggable: tableDraggable,
          dragConfig: {
            onDragEnd: ({ oldIndex, newIndex }) => {
              if (oldIndex !== newIndex) {
                const newData = arrayMoveImmutable(dataSource.slice(), oldIndex, newIndex).filter(
                  (el: object) => !!el,
                );
                // setDraggedDataSource(newData);
                setDataSource(newData);
              }
            }
          }
        }}
      />
    </>
  )
}

export default CrudPage;