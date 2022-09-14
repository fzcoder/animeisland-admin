import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Tabs, Space, Upload, Form, Input, message, InputNumber, Card, Select, Collapse, Divider} from 'antd';
import { UploadOutlined, CheckOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { SingleImageUpload } from '../../../components/upload';
import { EditPage } from '../../../components/advanced';
import { getInitForm, addForm, addFormBatch, getForm, updateForm } from "../../../api/video/item";
import { getVideoSourceMimeType, MimeTypeProps } from "../../../api/utils/mime-type";
import { getUserInfo, UserInfo } from '../../../api/auth/user';
import { getForm as getVideoSettings, VideoSettingsProps } from '../../../api/video/settings';
import { FormList } from '../../../components/ui';
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
  const [userInfo, setUserInfo] = useState<UserInfo>({id: "user_default", email: ""});
  const [settings, setSettings] = useState<VideoSettingsProps>();
  const [dataSource, setDataSource] = useState<Record<string, any>[]>([]);
  const [videoResourceUrlPrefix, setVideoResourceUrlPrefix] = useState<string>("");
  const [showForms, setShowForms] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        setUserInfo(await getUserInfo());
        setSettings(await getVideoSettings());
      } catch (err: any) {
        message.error(err);
      }
    })();
  }, []);
  useEffect(() => {
    if (settings) {
      setVideoResourceUrlPrefix(`${settings.videoResourceHost}${settings.videoResourceDir}`)
    }
  }, [settings]);
  return (
    <Space direction={"vertical"} style={{display: "flex"}}>
      <div style={{display: "flex", "alignItems": "center", "justifyContent": "space-between"}}>
        <Space>
          <Upload
            accept={".mp4"}
            name={"file"}
            showUploadList={false}
            multiple
            beforeUpload={(_, fileList) => {
              const _dataSource = [];
              fileList.forEach(item => {
                _dataSource.push({
                  title: item.name,
                  uid: userInfo.id,
                  description: item.name,
                  poster: "",
                  srcList: [
                    {
                      height: 0,
                      mimeType: item.type,
                      quality: "",
                      screenshot: "",
                      uid: userInfo.id,
                      url: item.name,
                      width: 0
                    }              
                  ]
                })
              })
              setDataSource(_dataSource);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />} disabled={dataSource.length > 0}>选择文件</Button>
          </Upload>
        </Space>
        <Space>
          <Button
            type={"primary"}
            icon={<CheckOutlined />} 
            children={"上传"}
            disabled={dataSource.length === 0}
            onClick={async () => {
              try {
                const forms = [...dataSource];
                forms.forEach((form, index) => {
                  const srcList = form["srcList"];
                  srcList.forEach((src: any, i : number) => {
                    src["url"] = `${videoResourceUrlPrefix}${dataSource[index]["srcList"][i]["url"]}`
                  })
                })
                await addFormBatch(forms);
                message.success("上传成功")
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
              setDataSource([]);
            }}
          />
        </Space>
      </div>
      {
        dataSource.length > 0 &&
        <Collapse>
          <Collapse.Panel header={"批量设置"} key={"1"}>
            <Form
              initialValues={{
                dir: "",
                width: 0,
                height: 0,
                quality: "",
                titlePrefix: "",
                titleSuffix: "",
              }}
              onFinish={(values) => {
                setShowForms(false);
                setVideoResourceUrlPrefix(`${settings.videoResourceHost}${settings.videoResourceDir}${values.dir}`);
                const _dataSource = [];
                // padding zero
                const padding_length = (dataSource.length + "").length;
                const padding = function (numStr: string, len: number) {
                  if (numStr.length >= len) {
                    return numStr;
                  }
                  return padding("0"+numStr, len);
                }
                dataSource.forEach((item, index) => {
                  const _s = []
                  item.srcList.forEach((s: any) => {
                    _s.push({
                      ...s,
                      width: values.width,
                      height: values.height,
                      quality: values.quality,
                    });
                  });
                  _dataSource.push({
                    ...item,
                    title: `${values.titlePrefix}${padding((index+1)+"", padding_length)}${values.titleSuffix}`,
                    srcList: _s,
                  })
                });
                setDataSource(_dataSource);
                setShowForms(true);
              }}
            >
              <Form.Item name={"dir"} label={"路径前缀"}>
                <Input allowClear />
              </Form.Item>
              <Form.Item name={"titlePrefix"} label={"标题前缀"}>
                <Input allowClear />
              </Form.Item>
              <Form.Item name={"titleSuffix"} label={"标题后缀"}>
                <Input allowClear />
              </Form.Item>
              <Form.Item name={"width"} label={"视频宽度"}>
                <InputNumber />
              </Form.Item>
              <Form.Item name={"height"} label={"视频高度"}>
                <InputNumber />
              </Form.Item>
              <Form.Item name={"quality"} label={"视频质量"}>
                <Input allowClear />
              </Form.Item>
              <Form.Item>
                <Button type="primary" block htmlType={"submit"}>更新</Button>
              </Form.Item>
            </Form>
          </Collapse.Panel>
        </Collapse>
      }
      <Divider />
      {showForms &&
        <FormList
          dataSource={dataSource}
          formLayout={"vertical"}
          onValuesChange={(_, allValues, index) => {
            const _dataSource = dataSource;
            _dataSource[index] = {...allValues};
            setDataSource(_dataSource);
          }}
          formItems={[
            { name: "uid", hidden: true, children: <Input allowClear/> },
            { name: "title", label: "标题", children: <Input allowClear/> },
            { name: "poster", label: "封面", children: <SingleImageUpload defaultInputMode /> },
            { name: "description", label: "描述", children: <TextArea rows={3} /> },
            {
              name: "srcList",
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
                            <Input />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            key={"srcList.url"}
                            label={"视频地址"}
                            name={[field.name, "url"]}
                          >
                            <Input addonBefore={videoResourceUrlPrefix} />
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
              )
            },
          ]}
        />
      }
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
          <MultipleUpload />
        )
      }    
    </div>
  )
}

export default VideoServiceItemUpload;
