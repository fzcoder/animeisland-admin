import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'move', color: '#999' }} />);
const SortableItem = SortableElement(props => <tr {...props} />);
const SortableBody = SortableContainer(props => <tbody {...props} />);

interface SortResultProps {
  collection?: number | undefined,
  isKeySorting?: boolean | undefined,
  newIndex: number,
  nodes?: any[] | undefined,
  oldIndex: number,
}

interface BaseDraggableTableProps extends React.HTMLAttributes<HTMLElement> {
  columns?: any[] | undefined,
  dataSource?: readonly any[] | undefined,
  rowKey?: string | undefined,
  size?: 'small' | 'middle' | 'large' | undefined,
  onSortEnd?: (result: SortResultProps) => void | undefined,
}
export declare type DraggableTableProps = BaseDraggableTableProps;
const DraggableTable: React.FC<DraggableTableProps> = (props) => {
  const {columns, dataSource, rowKey, size, onSortEnd, ...restProps} = props;
  const [mergedColumns, setMergedColumns] = useState<any[]>([]);
  useEffect(() => {
    if (columns) {
      const mergedColumnsWithDrag = [{
        title: '',
        dataIndex: 'sort',
        width: 30,
        className: 'drag-visible',
        render: () => <DragHandle />,
      }, ...columns];
      setMergedColumns(mergedColumnsWithDrag);
    }
  }, [columns]);
  return (
    <div>
      { dataSource &&
        <Table
          columns={mergedColumns}
          dataSource={dataSource}
          rowKey={rowKey || 'id'}
          pagination={false}
          size={size}
          components={{
            body: { 
              wrapper: props => (
                <SortableBody
                  useDragHandle
                  disableAutoscroll
                  helperClass="row-dragging"
                  onSortEnd={(e) => {
                    if (onSortEnd) onSortEnd(e);
                  }}
                  {...props}
                />
              ),
              row: ({ className, style, ...restProps }) => {
                // function findIndex base on Table rowKey props and should always be a right array index
                const index = dataSource.findIndex(x => x[rowKey || 'id']=== restProps['data-row-key']);
                return <SortableItem index={index} {...restProps} />;
              }
            }
          }}
        />
      }
    </div>
  )
}

export default DraggableTable;
