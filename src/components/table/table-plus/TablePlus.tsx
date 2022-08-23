import React from "react";
import { Table } from "antd";
import type { TableProps, ColumnsType as AntdTableColumnsType } from "antd/es/table";
import { MenuOutlined } from '@ant-design/icons';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import type {
  SortableContainerProps as DraggableContainerProps,
  SortEnd as DragEnd
} from 'react-sortable-hoc';

type DefaultRecordType = Record<string, any>;

export declare type ColumnsType<RecordType = unknown> = AntdTableColumnsType<RecordType>;

// draggable
const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'move', color: '#999' }} />);
const DraggableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />);
const DraggableBody = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />);
export declare type DraggableConfig<RecordType> = {
  beforeUseDragModeColumns?: () => Promise<ColumnsType<RecordType>>,
  onDragEnd?: (result: DragEnd) => void,
};

// https://ant-design.gitee.io/components/table-cn/#API
export declare type TablePlusProps<RecordType = DefaultRecordType> = {
  draggable?: false | DraggableConfig<RecordType>,
} & Omit<TableProps<RecordType>, 'components'>;
const TablePlus: React.FC<TablePlusProps> = (props) => {
  const {
    columns,
    dataSource,
    draggable,
    ...restProps
  } = props;
  // draggable columns
  const draggableColumns = [{
    title: '',
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    render: () => <DragHandle />,
  }, ...columns || []];
  return (
    <Table
      columns={draggable ? draggableColumns : columns}
      components={
        draggable ? {
          body: {
            wrapper: (props: DraggableContainerProps) => (
              <DraggableBody
                useDragHandle
                disableAutoscroll
                helperClass="row-dragging"
                onSortEnd={(e: DragEnd) => {
                  if (draggable) {
                    if (draggable.onDragEnd) draggable.onDragEnd(e);
                  }
                }}
                {...props}
              />
            ),
            row: ({ className, style, ...props }) => {
              // function findIndex base on Table rowKey props and should always be a right array index
              const index = dataSource.findIndex((record) => {
                if (typeof restProps.rowKey === 'string') {
                  return record[restProps.rowKey] === props['data-row-key']
                } else {
                  return record[restProps.rowKey(record)] === props['data-row-key']
                }
              });
              return <DraggableItem index={index} {...props} />;
            }
          }
        } : null
      }
      dataSource={dataSource}
      {...restProps}
    />
  )
}

export default TablePlus;