import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Tabs, Space, Upload, Form, List, Input, message, InputNumber, Card, Select} from 'antd';
import { UploadOutlined, CheckOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { SingleImageUpload } from '../../../components/upload';
import { EditPage } from '../../../components/advanced';
import { getInitForm, addForm, addFormBatch, getForm, updateForm } from "../../../api/video/item";
import { getVideoSourceMimeType, MimeTypeProps } from "../../../api/utils/mime-type";
import { getUserInfo } from '../../../api/auth/user';
import "./styles/upload.css";
const { TextArea } = Input;
const { TabPane } = Tabs;

// 单文件上传
type SingleUploadProps = {
  updateMode?: boolean
}
const SingleUpload: React.FC<SingleUploadProps> = ({updateMode}) => {
  const params = useParams();
  const [mimeTypeList, setMimeTypeList] = useState<MimeTypeProps[]>([]);
  useEffect(() => {
    (async () => {
      try {
        setMimeTypeList(await getVideoSourceMimeType());
      } catch (err: any) {
        message.error(err);
      }
    })()
  },[]);
  return (
    <EditPage
      updateMode={updateMode}
      updateRecordKey={params.id}
      onGetInitFormData={getInitForm}
      onGetInitUpdateFormData={getForm}
      onSubmitForm={addForm}
      onUpdateForm={updateForm}
      formItemsProps={[
        { name: "uid", hidden: true, children: <Input /> },
        { name: "title", label: "标题", children: <Input /> },
        { name: "poster", label: "封面", children: <SingleImageUpload /> },
        { name: "description", label: "描述", children: <TextArea rows={3} /> },
        {
          label: "视频源",
          children: (
            <Form.List name={"srcList"}>
              {(fields, {add, remove}) => (
                <Space direction={"vertical"} style={{display: "flex"}}>
                  {fields.map(field => (
                    <Card
                      key={field.key}
                      title={"播放源"}
                      size={"small"}
                      extra={
                        <Button type={"link"} onClick={() => remove(field.name)}>删除</Button>
                      }
                    >
                      <Form.Item
                        {...field}
                        key={"srcList.width"}
                        label={"视频宽度"}
                        name={[field.name, "width"]}
                      >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        key={"srcList.height"}
                        label={"视频高度"}
                        name={[field.name, "height"]}
                      >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        key={"srcList.quality"}
                        label={"视频质量"}
                        name={[field.name, "quality"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        key={"srcList.mimeType"}
                        label={"媒体类型"}
                        name={[field.name, "mimeType"]}
                      >
                        <Select options={mimeTypeList} />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        key={"srcList.url"}
                        label={"视频地址"}
                        name={[field.name, "url"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        key={"srcList.screenshot"}
                        label={"视频截帧"}
                        name={[field.name, "screenshot"]}
                      >
                        <SingleImageUpload />
                      </Form.Item>
                    </Card>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>添加视频源</Button>
                  </Form.Item>
                </Space>
              )}
            </Form.List>
          )
        },
      ]}
      updateFormItemsProps={[
        { name: "id", hidden: true, children: <Input /> },
        { name: "uid", hidden: true, children: <Input /> },
        { name: "title", label: "标题", children: <Input /> },
        { name: "poster", label: "封面", children: <SingleImageUpload /> },
        { name: "description", label: "描述", children: <TextArea rows={3} /> },
      ]}
    />
  )
}

const MultipleUpload: React.FC<{}> = () => {
  const [formDataList, setFormDataList] = useState<Record<string, any>[]>([]);
  const [dataSource, setDataSource] = useState<Record<string, any>[]>([]);
  return (
    <Space direction={"vertical"} style={{display: "flex"}}>
      <div style={{display: "flex", "alignItems": "center", "justifyContent": "space-between"}}>
        <Upload
          accept='.json'
          name='file'
          showUploadList={false}
          maxCount={1}
          multiple={false}
          action={`${process.env.REACT_APP_SERVER_BASE_URL}/video/item/batch/upload`}
          /* headers={{
            Authorization: `Bearer ${localStorage.getItem('accessToken') || ""}`
          }} */
          onChange={({file}) => {
            const { status, response } = file;
            if (status === "done") {
              const _dataSource: Record<string, any>[] = response.data;
              setDataSource(_dataSource);
              setFormDataList(_dataSource);
            }
          }}
        >
          <Button icon={<UploadOutlined />} disabled={dataSource.length > 0}>上传表单</Button>
        </Upload>
        <Space>
          <Button
            type={"primary"}
            icon={<CheckOutlined />} 
            children={"批量上传"}
            disabled={dataSource.length === 0}
            onClick={async () => {
              try {
                const { id: uid } = await getUserInfo();
                const _forms: Record<string, any>[] = [];
                formDataList.forEach((value) => {
                  _forms.push({...value, uid});
                });
                await addFormBatch(_forms);
                message.success("批量上传成功")
              } catch (err: any) {
                message.error(err);
              }
            }}
          />
          <Button
            type={"primary"}
            danger
            icon={<DeleteOutlined />} 
            children={"清空"}
            disabled={dataSource.length === 0}
            onClick={() => {
              setFormDataList([]);
              setDataSource([]);
            }}
          />
        </Space>
      </div>
      <List
        dataSource={dataSource}
        renderItem={(item, index) => (
          <List.Item>
            <Form
              initialValues={item}
              style={{width: "100%"}}
              onValuesChange={(_, allValues) => {
                const _formDataList = formDataList;
                _formDataList[index] = {...allValues};
                setFormDataList(_formDataList);
              }}
            >
              <Form.Item name={"title"} label={"标题"}>
                <Input />
              </Form.Item>
              <Form.Item name={"poster"} label={"封面"}>
                <SingleImageUpload defaultInputMode />
              </Form.Item>
              <Form.Item name={"description"} label={"描述"}>
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item name={"srcList"} label={"视频源"}>
                <Form.List name={"srcList"}>
                  {(fields, {add, remove}) => (
                    <Space direction={"vertical"} style={{display: "flex"}}>
                      {fields.map(field => (
                        <Card
                          key={field.key}
                          title={"播放源"}
                          size={"small"}
                          extra={
                            <Button type={"link"} onClick={() => remove(field.name)}>删除</Button>
                          }
                        >
                          <Form.Item
                            {...field}
                            key={"srcList.width"}
                            label={"视频宽度"}
                            name={[field.name, "width"]}
                          >
                            <InputNumber />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            key={"srcList.height"}
                            label={"视频高度"}
                            name={[field.name, "height"]}
                          >
                            <InputNumber />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            key={"srcList.quality"}
                            label={"视频质量"}
                            name={[field.name, "quality"]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            key={"srcList.mimeType"}
                            label={"媒体类型"}
                            name={[field.name, "mimeType"]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            key={"srcList.url"}
                            label={"视频地址"}
                            name={[field.name, "url"]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            key={"srcList.screenshot"}
                            label={"视频截帧"}
                            name={[field.name, "screenshot"]}
                          >
                            <SingleImageUpload defaultInputMode />
                          </Form.Item>
                        </Card>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>添加视频源</Button>
                      </Form.Item>
                    </Space>
                  )}
                </Form.List>
              </Form.Item>
            </Form>
          </List.Item>
        )}
      />
    </Space>
  )
}

export declare type VideoServiceItemPageProps = {
  updateMode?: boolean,
}
const VideoServiceItemUpload: React.FC<VideoServiceItemPageProps> = ({updateMode}) => {
  return (
    <div className='app-video-item-upload'>
      {
        updateMode ? (
          <SingleUpload updateMode />
        ) : (
          <Tabs
            defaultActiveKey={"single"}
            tabPosition={'right'}
          >
            <TabPane tab="单视频上传" key={"single"}>
              <SingleUpload />
            </TabPane>
            <TabPane tab="多视频上传" key={"mul"}>
              <MultipleUpload />
            </TabPane>
          </Tabs>
        )
      }    
    </div>
  )
}

export default VideoServiceItemUpload;
