import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Table, Space, Button, Input, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './ListPage.css';

const { Search } = Input;
const { confirm } = Modal;

// 查询参数
interface QueryParams {
  orderBy: string,
  decs: boolean,
  status: number,
  needUid: boolean
}

// 查询属性
interface QueryProps {
  path: string, // 请求路径
  params: QueryParams, // 请求参数
}

// 按钮类型
type ButtonTypes = 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | undefined;
// 按钮尺寸
type ButtonSizes = 'small' | 'middle' | 'large' | undefined;
// 按钮形状
type ButtonShapes = 'default' | 'circle' | 'round' | undefined;
// 多选按钮属性
interface selectionButtonProps {
  label?: string,
  type?: ButtonTypes,
  size?: ButtonSizes,
  shape?: ButtonShapes,
  icon?: React.ReactNode,
  danger?: boolean | undefined,
  onClick?: (selectedRowKeys: any[], selectedRows: any[]) => void | undefined,
}
// 分页器大小
type paginationSizes = 'default' | 'small' | undefined;

// 通用列表页属性
interface ListPageProps extends React.HTMLAttributes<HTMLElement> {
  columns?: object[],
  query?: QueryProps,
  rowKey?: string,
  tableSize?: 'small' | 'middle' | 'large' | undefined,
  inputSize?: 'small' | 'middle' | 'large' | undefined,
  paginationSize?: paginationSizes,
  extraButtonGroup?: React.ReactNode | undefined,
  selectionButtons?: selectionButtonProps[] | undefined,
  expandable?: object | undefined,
}

// 通用列表页Ref属性
interface ListPageRefProps {
  // 更新数据源
  updatePage: () => void,
  // 展示确认对话框
  showConfirm: (title: string, content: string, onOk: () => void, onCancel: () => void) => void,
  // 删除某一项
  deleteItem: (path: string, showSuccessMessage: boolean) => void,
  // 删除某一项(含对话框)
  deleteItemWithConfirm: (path: string) => void,
  // 删除多项(含对话框)
  deleteItemsWithConfirm: (selectedRowKeys: any[], pathPrefix: string) => void,
}

// 通用列表页
function ListPage (
  {
    columns, 
    query, 
    rowKey, 
    tableSize, 
    inputSize, 
    paginationSize, 
    extraButtonGroup, 
    selectionButtons, 
    expandable
  }: ListPageProps,
  ref: React.ForwardedRef<ListPageRefProps>
) {
  // 数据源
  const [dataSource, setDataSource] = useState<any[]>([]);

  // 查询配置
  // const uid = JSON.parse(localStorage.getItem('userInfo') || '').sub;
  const uid = "";
  const [keyword, setKeyword] = useState<string>('');
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<string>('');
  const [decs, setDecs] = useState<boolean>(true);
  const [status, setStatus] = useState<number>(0);

  // 分页配置
  const pagination = {
    current: pageNum,
    pageSize: pageSize,
    total: total,
    size: paginationSize as paginationSizes,
    onChange: (pageNum: number, pageSize: number) => {
      setPageNum(pageNum);
      setPageSize(pageSize);
      getPage(keyword, pageNum, pageSize, orderBy, decs, status);
    }
  }

  // 加载配置
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loading = {
    spinning: isLoading,
    tip: 'loading...'
  }

  // 多选配置
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    }
  }

  useEffect(() => {
    if (query) {
      const { orderBy, decs, status } = query.params;
      setOrderBy(orderBy);
      setDecs(decs);
      setStatus(status);
      getPage(keyword, pageNum, pageSize, orderBy, decs, status);
    }
  }, [query]);

  useImperativeHandle(ref, () => ({
    // 更新数据源
    updatePage: () => getPage(keyword, pageNum, pageSize, orderBy, decs, status),
    // 展示确认对话框
    showConfirm,
    // 删除某一项
    deleteItem,
    // 删除某一项(含对话框)
    deleteItemWithConfirm,
    // 删除多项(含对话框)
    deleteItemsWithConfirm
  }));

  // 查询列表
  const getPage = async (
    keyword: string,
    pageNum: number,
    pageSize: number,
    orderBy: string,
    decs: boolean,
    status: number
  ) => {
    if (query) {
      let params = {
        key: keyword,
        page_num: pageNum,
        page_size: pageSize,
        order_by: orderBy,
        decs,
        status,
      }
      // 判断是否需要添加 uid
      if (query?.params.needUid) {
        const _params = {...params, uid };
        params = _params;
      }
      setIsLoading(true); // 加载中
      // GET请求异步查询
      const { data: result } = await React['$http'].get(query.path, { params });
      setIsLoading(false); // 加载完成
      if (result.code !== 0) {
        message.error(result.msg);
        return;
      }
      // 配置数据源
      setDataSource(result.data.records);
      // 分页配置
      setTotal(result.data.total);  
    }
  }

    // 展示确认对话框
    const showConfirm = (title, content, onOk, onCancel) => {
      confirm({
        title: title,
        icon: <ExclamationCircleOutlined />,
        content: content,
        okText: '确定',
        cancelText: '取消',
        onOk: onOk,
        onCancel: onCancel
      })
    }
  
    // 删除某一项
    const deleteItem = async (path, showSuccessMessage) => {
      const { data: result } = await React['$http'].delete(path);
      if (result.code !== 0) {
        message.error(result.msg);
      }
      if (showSuccessMessage) {
        message.success(result.msg);
      }
      // 更新列表
      getPage(keyword, pageNum, pageSize, orderBy, decs, status);
    }
  
    // 删除某一项(含对话框)
    const deleteItemWithConfirm = (path) => {
      showConfirm(
        '确定删除所选内容?', 
        '删除的内容无法恢复, 请谨慎选择',
        () => { deleteItem(path, true); },
        () => {}
      )
    }
  
    // 删除多项(含对话框)
    const deleteItemsWithConfirm = (selectedRowKeys, pathPrefix) => {
      showConfirm(
        '确定删除所选内容?',
        '删除的内容无法恢复, 请谨慎选择',
        () => {
          selectedRowKeys.forEach(id => {
            deleteItem(`${pathPrefix}/${id}`, false);
          })
        },
        () => {}      
      )
    }

  return (
    <div className='my-component-template-listpage'>
      <div className='my-component-template-listpage-header'>
        <div className='my-component-template-listpage-bg'>
          <Space>
            {extraButtonGroup}
            {selectionButtons?.map((btn, key) => (
              <Button
                key={btn.label || `${key}-selectionButtonGroup`}
                type={btn.type}
                icon={btn.icon || <></>}
                shape={btn.shape || 'default'}
                size={btn.size || 'middle'}
                danger={btn.danger}
                disabled={selectedRowKeys.length < 1}
                onClick={() => {
                  if (btn.onClick) {
                    btn.onClick(selectedRowKeys, selectedRows);
                  }
                }}
              >{btn.label}</Button>
            ))}
          </Space>
        </div>
        <div className='my-component-template-listpage-search'>
          <Search
            placeholder="input search text"
            onSearch={(value, e) => {
              setKeyword(value);
              getPage(value, pageNum, pageSize, orderBy, decs, status);
            }}
            style={{ width: 200 }}
            size={inputSize}
          />
        </div>
      </div>
      <div className='my-component-template-listpage-main'>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={rowKey || 'id'}
          pagination={pagination}
          rowSelection={rowSelection}
          loading={loading}
          size={tableSize}
          expandable={expandable}
        />
      </div>
    </div>
  )
}

export default React.forwardRef(ListPage);
