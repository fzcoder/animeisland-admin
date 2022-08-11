import React, { useState, useEffect } from "react";
import { Button, Input, InputNumber, Modal, message } from "antd";
import { PlayCircleOutlined, DragOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CrudPage } from "../../../components/advanced";
import { EpisodeProps, getRecords, updateForm, getList, updateBatch, deleteRecord, deleteRecords } from "../../../api/video/episode";
import { DraggableTable } from "../../../components/table";
import { arrayMoveImmutable } from 'array-move';

interface SortModalProps {
  visible?: boolean | undefined,
  onOk?: (newForms: EpisodeProps[]) => void | undefined,
  onCancel?: () => void | undefined,
}
// 顺序调整对话框
const SortModal: React.FC<SortModalProps> = ({
  visible, onOk, onCancel
}) => {
  const [searchParams] = useSearchParams();
  const [dataSource, setDataSource] = useState<EpisodeProps[]>([]);
  const [originData, setOriginData] = useState<EpisodeProps[]>([]);

  useEffect(() => {
    if (visible) {
      (async () => {
        try {
          const list = await getList(searchParams.get('bangumi_id') || "");
          setDataSource(list);
          setOriginData(list);
        } catch (err: any) {
          message.error(err);
        }
      })();
    }
  }, [visible]);

  const columns = [
    {
      title: '序列',
      dataIndex: 'orderInBangumi',
      key: 'orderInBangumi',
      width: 60
    },
    {
      title: '序列名称',
      dataIndex: 'orderName',
      key: 'orderName',
      width: 100,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
  ]

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const _dataSource: EpisodeProps[] = [...dataSource];
      const newData = arrayMoveImmutable<EpisodeProps>(_dataSource, oldIndex, newIndex).filter(
        el => !!el,
      );
      // 重新排序
      newData.forEach((data, index) => {
        data.orderInBangumi = index + 1;
      })
      setDataSource(newData);
    }
  }

  const handleSubmit = () => {
    const updateForm: EpisodeProps[] = [];
    originData.forEach((data, index) => {
      if (dataSource[index] !== data) {
        updateForm.push(dataSource[index]);
      }
    })
    if (onOk) onOk(updateForm);
  }

  return (
    <Modal
      title="调整播放顺序"
      visible={visible}
      width={800}
      okText="提交"
      cancelText="取消"
      maskClosable={false}
      keyboard={false}
      closable={false}
      bodyStyle={{
        maxHeight: '500px',
        overflowY: 'auto'
      }}
      onOk={() => {
        handleSubmit();
      }}
      onCancel={() => {
        if (onCancel) onCancel();
      }}
    >
      <DraggableTable
        columns={columns}
        dataSource={dataSource}
        size='small'
        onSortEnd={onSortEnd}
      />
    </Modal>
  )
}

const VideoEpisodeTablePage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const updateForms = async (forms: EpisodeProps[]) => {
    try {
      await updateBatch(forms);
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
  return (
    <>
      <SortModal
        visible={showSortModal}
        onOk={(newForms) => {
          updateForms(newForms).then(_ => {
            message.success("修改成功");
            setShowSortModal(false);
            setTimeout(() => {
              navigate(0);
            }, 1000);
          }).catch(err => {
            message.error(err);
          }) 
        }}
        onCancel={() => {
          setShowSortModal(false);
        }}
      />
      <CrudPage
        useUpdateFormDialog
        updateFormTitle={"修改剧集信息"}
        onAddRecord={() => navigate(`/video/episode/edit?bangumi_id=${searchParams.get("bangumi_id") || ""}`)}
        onSubmitUpdateForm={updateForm}
        onDeleteRecord={deleteRecord}
        onDeleteSelectedRecords={deleteRecords}
        updateFormItemProps={[
          {
            name: 'id',
            hidden: true,
            children: <Input disabled />
          },
          {
            label: '番剧ID',
            name: 'bangumiId',
            children: <Input disabled />
          },
          {
            label: '视频ID',
            name: 'videoId',
            children: <Input disabled />
          },
          {
            label: '序列',
            name: 'orderInBangumi',
            children: <InputNumber disabled />
          },
          {
            label: '标题',
            name: 'title',
            children: <Input allowClear />
          },
          {
            label: '序列名称',
            name: 'orderName',
            children: <Input allowClear />
          },
        ]}
        onGetRecords={async (key, pageNum, pageSize) => {
          try {
            return Promise.resolve(await getRecords(key, pageNum, pageSize, searchParams.get('bangumi_id') || ""))
          } catch (err: any) {
            return Promise.reject(err);
          }
        }}
        toolbarLeftExtra={
          <Button
            icon={<DragOutlined />}
            children="调整播放顺序"
            onClick={() => setShowSortModal(true)}
          />
        }
        tableColumnsProps={[
          {
            title: '序列名称',
            dataIndex: 'orderName',
            key: 'orderName',
            width: 100,
          },
          {
            title: '剧集标题',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: any, index: number) => (
              <Button
                type='link'
                icon={<PlayCircleOutlined />}
                style={{ padding: '0px' }}
                onClick={() => navigate(`/video/bangumi/play/${record.id}`)}
              >
                {text !== '' ? text : record.orderName}
              </Button>
            )
          },
        ]}
        extraTableActions={(value, record) => (
          <Button
            icon={<UnorderedListOutlined />}
            children={"视频源"}
            onClick={() => navigate(`/video/source/list?vid=${record.videoId}`)}
          />
        )}
      />
    </>
  )
}

export default VideoEpisodeTablePage;