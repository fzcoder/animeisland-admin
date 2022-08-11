import React, { useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Steps, Space, Button, Modal, List, Form, Input, InputNumber, Spin, Result } from 'antd';
import ListPage from "../../../components/template/ListPage";
import { DraggableTable } from '../../../components/table';
import { arrayMoveImmutable } from 'array-move';
import './styles/Create.css';

const { Step } = Steps;

// 剧集表单
interface EpisodeFormProps {
  bangumiId: string,
  videoId: string,
  title: string | undefined,
  orderInBangumi: number,
  orderName: string,
  status: number,
}

// 视频选择器属性
interface VideoSelectorProps {
  visible?: boolean | undefined,
  onOk?: (selectedKeys: any[], selectedRows: any[]) => void | undefined,
  onCancel?: () => void | undefined,
}

// 视频选择器
const VideoSelector: React.FC<VideoSelectorProps> = ({
  visible, onOk, onCancel
}) => {
  const columns = [
    {
      title: 'VID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    },
  ];

  const query = {
    path: '/video/item/page',
    params: {
      orderBy: 'title',
      decs: false,
      status: 0,
      needUid: true
    }
  };

  return (
    <Modal
      title='选择视频'
      visible={visible}
      width={1000}
      keyboard={false}
      maskClosable={false}
      bodyStyle={{
        padding: '20px',
      }}
      footer={[]}
      onCancel={() => {
        if (onCancel) {
          onCancel();
        }
      }}
    >
      <ListPage
        columns={columns}
        query={query}
        selectionButtons={[
          {
            label: '确定',
            size: 'small',
            type: 'primary',
            onClick: (keys, rows) => {
              if (onOk) {
                onOk(keys, rows);
              }
            }
          },
        ]}
        tableSize='small'
        inputSize='small'
        paginationSize='small'
      />
    </Modal>
  )
}

// 步骤 1 属性
interface Step1Props {
  onFinish?: (forms: EpisodeFormProps[]) => void | undefined,
  onCancel?: () => void | undefined,
}

// 步骤 1
const Step1: React.FC<Step1Props> = ({
  onFinish, onCancel
}) => {
  const [searchParams] = useSearchParams();
  const [showVideoSelector, setShowVideoSelector] = useState<boolean>(false);

  const [forms, setForms] = useState<EpisodeFormProps[]>([]);

  // 关闭对话框
  const closeModal = () => {
    setShowVideoSelector(false);
  }

  // 更新数据
  const update = (keys: string[], rows: object[]) => {
    closeModal();
    const bangumiId = searchParams.get('bangumi_id');
    const _forms: EpisodeFormProps[] = [];
    const offset = forms.length;
    if (bangumiId !== null) {
      rows.forEach((row, index) => {
        _forms.push({
          bangumiId,
          videoId: row['id'],
          orderInBangumi: index + 1 + offset,
          title: row['title'],
          orderName: `第${index + 1 + offset}话`,
          status: 0,
        });
      });
    }
    setForms([...forms, ..._forms]);
  }

  const columns = [
    {
      title: '序列',
      dataIndex: 'orderInBangumi',
      key: 'orderInBangumi',
      width: '60px'
    },
    {
      title: '视频ID',
      dataIndex: 'videoId',
      key: 'videoId',
    },
    {
      title: '剧集标题',
      dataIndex: 'title',
      key: 'title',
    },
  ] 

  return (
    <div className='app-video-episode-create-step1'>
      <VideoSelector
        visible={showVideoSelector}
        onOk={update}
        onCancel={() => { setShowVideoSelector(false); }}
      />
      <div className='app-video-episode-create-step1-bg'>
        <Space>
          <Button
            type='primary'
            onClick={() => { setShowVideoSelector(true) }}
          >选择视频</Button>
          <Button
            type='primary'
            danger
            icon={<></>}
            onClick={() => { setForms([]); }}
          >清空</Button>
        </Space>
      </div>
      <div className='app-video-episode-create-step1-main'>
        <DraggableTable
          rowKey='videoId'
          columns={columns}
          dataSource={forms}
          onSortEnd={({ oldIndex, newIndex }) => {
            if (oldIndex !== newIndex) {
              const _forms: EpisodeFormProps[] = [...forms];
              const newData = arrayMoveImmutable<EpisodeFormProps>(_forms, oldIndex, newIndex).filter(
                el => !!el,
              );
              // 重新排序
              newData.forEach((data, index) => {
                data.orderInBangumi = index + 1;
              })
              setForms(newData);
            }
          }}
        />
      </div>
      <div className='app-video-episode-create-step1-footer'>
        <Space>
          <Button
            type='primary'
            onClick={() => {
              if (onFinish) onFinish(forms);
            }}
            disabled={forms.length < 1}
          >下一步</Button>
          <Button
            onClick={() => {
              if (onCancel) onCancel();
            }}
          >取消</Button>
        </Space>
      </div>
    </div>
  )
}

// 步骤2属性
interface Step2Props {
  forms?: EpisodeFormProps[] | undefined,
  onChange?: (changedItem: EpisodeFormProps, index: number) => void | undefined,
  onFinish?: () => void | undefined,
  onCancel?: () => void | undefined,
}

// 步骤2
const Step2: React.FC<Step2Props> = ({
  forms, onChange, onFinish, onCancel
}) => {
  return (
    <div className='app-video-episode-create-step2'>
      <div className='app-video-episode-create-step2-main'>
        <List
          header={
            <><h3>剧集清单, 共 {forms?.length || 0 } 项</h3></>
          }
        >
          {
            forms &&
            forms.map((form, index) => (
              <List.Item key={index} style={{ display: 'block' }}>
                <Form
                  initialValues={form}
                  onValuesChange={(_, allValues) => {
                    if (onChange) {
                      onChange(allValues, index);
                    }
                  }}
                >
                  <Form.Item name='videoId' label='视频ID'>
                    <Input disabled />
                  </Form.Item>
                  <Form.Item name='bangumiId' label='番剧ID'>
                    <Input disabled />
                  </Form.Item>
                  <Form.Item name='orderInBangumi' label='剧集序列'>
                    <InputNumber disabled />
                  </Form.Item>
                  <Form.Item name='orderName' label='序列名称'>
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item name='title' label='剧集标题'>
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item name='status' hidden>
                    <Input disabled />
                  </Form.Item>
                </Form>              
              </List.Item>
            ))
          }
        </List>        
      </div>
      <div className='app-video-episode-create-step2-footer'>
        <Space>
          <Button
            type='primary'
            icon={<></>}
            onClick={() => { if(onFinish) onFinish() }}
          >提交</Button>
          <Button
            icon={<></>}
            onClick={() => { if(onCancel) onCancel() }}
          >取消</Button>
        </Space>
      </div>
    </div>
  )
}

// 步骤3
const Step3: React.FC<{}> = () => {
  return (
    <div className='app-video-episode-create-step3'>
      <Spin tip="正在上传..." />
    </div>
  )
}

// 添加剧集
const VideoEpisodeCreate: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [current, setCurrent] = useState<number>(0);
  // 表单数据
  const [forms, setForms] = useState<EpisodeFormProps[]>([]);

  // 下一步
  const next = () => {
    setCurrent(current + 1);
  };

  // 批量上传
  const uploadBatch = async () => {
    const { data: result } = await React['$http'].post('/video/episode/batch', forms);
    if (result.code !== 0) {
      setCurrent(4);
      return;
    }
    setCurrent(3);
  }

  // 成功结果
  const SuccessResult = () => (
    <Result
      status='success'
      title='批量上传成功'
      subTitle=''
      extra={[
        <Button
          type='primary'
          icon={<></>}
          onClick={() => {
            navigate(`/video/episode/list?bangumi_id=${searchParams.get('bangumi_id')}`);
          }}
        >查看结果</Button>,
        <Button
          icon={<></>}
          onClick={() => {
            navigate('/video/bangumi/list');
          }}
        >返回</Button>
      ]}
    />
  );

  // 失败结果
  const ErrorResult = () => (
    <Result
      status='error'
      title='批量上传失败'
      subTitle=''
      extra={[
        <Button
          type='primary'
          icon={<></>}
          onClick={() => {
            navigate(`/video/episode/create?bangumi_id=${searchParams.get('bangumi_id')}`);
          }}
        >重新上传</Button>,
        <Button
          onClick={() => {
            navigate('/video/bangumi/list');
          }}
          icon={<></>}
        >返回</Button>
      ]}
    />
  );

  // 取消
  const cancel = () => {
    navigate(-1);
  }

  return (
    <div className='app-video-episode-create'>
      <div className='app-video-episode-create-header'>
        <Steps current={current}>
          <Step title='选择视频'></Step>
          <Step title='填写表单'></Step>
          <Step title='批量添加'></Step>
        </Steps>
      </div>
      <div className='app-video-episode-create-main'>
        { current === 0 &&
          <Step1
            onFinish={(_forms) => {
              setForms(_forms);
              next();
            }}
            onCancel={cancel}
          />
        }
        { current === 1 &&
          <Step2
            forms={forms}
            onChange={(changedItem, index) => {
              const _form = [...forms];
              _form[index] = changedItem;
              setForms(_form);
            }}
            onFinish={() => {
              next();
              uploadBatch();
            }}
            onCancel={cancel}
          />
        }
        { current === 2 && <Step3 />}
        { current === 3 && <SuccessResult />}
        { current === 4 && <ErrorResult />}
      </div>
    </div>  
  )
}

export default VideoEpisodeCreate;
