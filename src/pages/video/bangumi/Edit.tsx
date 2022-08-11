import React, { useEffect, useState, } from "react";
import { Input, DatePicker, Select, message, Form, } from "antd";
import { useParams } from 'react-router-dom';
import { EditPage } from "../../../components/advanced";
import { SingleImageUpload } from "../../../components/upload";
import { getList as _getChannelList } from "../../../api/video/channel";
import { getCountryList, CountryInfo } from "../../../api/utils/country";
import {
  addForm,
  getInitForm, 
  getForm, 
  updateForm, 
  getTypeList as _getTypeList, 
  getGradeList as _getGradeList,
  getTagList as _getTagList,
  getTagListWithBangumiId,
  addBangumiTagItemBatch,
  updateBangumiTagItemBatch,
  getStatusList,
} from "../../../api/video/bangumi";

const { TextArea } = Input;
const { Option } = Select;

interface OptionProps {
  label: string,
  value: string | number,
}

export declare type VideoBangumiEditPageProps = {
  updateMode?: boolean,
}

const VideoBangumiEditPage: React.FC<VideoBangumiEditPageProps> = ({ updateMode }) => {
  const params =  useParams();
  const [formHook] = Form.useForm();
  const [updateFormHook] = Form.useForm();
  // select options
  const [channelId, setChannelId] = useState<string | undefined>(undefined);
  const [channelList, setChannelList] = useState<OptionProps[]>([]);
  const [typeList, setTypeList] = useState<OptionProps[]>([]);
  const [gradeList, setGradeList] = useState<OptionProps[]>([]);
  const [tagList, setTagList] = useState<OptionProps[]>([]);
  const [statusList,setStatusList] = useState<OptionProps[]>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [originSelectedTags, setOriginSelectedTags] = useState<string[]>([]);
  const [countryList, setCountryList] = useState<CountryInfo[]>([]);
  const getChannelList = async (): Promise<OptionProps[]> => {
    try {
      const list = await _getChannelList();
      const options: OptionProps[] = [];
      list.forEach(e => {
        options.push({value: e.id, label: e.name});
      });
      return Promise.resolve(options);
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
  const getTypeList = async (channel_id: string): Promise<OptionProps[]> => {
    try {
      const list = await _getTypeList(channel_id);
      const options: OptionProps[] = [];
      list.forEach(e => {
        options.push({value: e.id, label: e.name});
      });
      return Promise.resolve(options);
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
  const getGradeList = async (channel_id: string): Promise<OptionProps[]> => {
    try {
      const list = await _getGradeList(channel_id);
      const options: OptionProps[] = [];
      list.forEach(e => {
        options.push({value: e.id, label: e.name});
      });
      return Promise.resolve(options);
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
  const getTagList = async (channel_id: string): Promise<OptionProps[]> => {
    try {
      const list = await _getTagList(channel_id);
      const options: OptionProps[] = [];
      list.forEach(e => {
        options.push({value: e.id, label: e.name});
      });
      return Promise.resolve(options);
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
  useEffect(() => {
    (async () => {
      try {
        const _channelList = await getChannelList();
        setChannelList(_channelList);
        const _countryList = await getCountryList();
        setCountryList(_countryList);
        const _statusList = await getStatusList();
        setStatusList(_statusList);
      } catch(err: any) {
        message.error(err);
      }
    })();
  }, []);
  useEffect(() => {
    if (channelId) {
      (async (channelId: string) => {
        try {
          const _typeList = await getTypeList(channelId);
          setTypeList(_typeList);
          const _gradeList = await getGradeList(channelId);
          setGradeList(_gradeList);
          const _tagList = await getTagList(channelId);
          setTagList(_tagList);
        } catch(err: any) {
          message.error(err);
        }
      })(channelId);
    }
  }, [channelId]);
  return (
    <EditPage
      updateMode={updateMode}
      updateRecordKey={params.id}
      onGetInitFormData={getInitForm}
      onGetInitUpdateFormData={async (key) => {
        try {
          const form = await getForm(key);
          setChannelId(form["channelId"] || undefined);
          const tags = await getTagListWithBangumiId(form["id"]);
          const _tags: string[] = [];
          tags.forEach(tag => {
            _tags.push(tag.id);
          });
          setSelectedTags(_tags);
          setOriginSelectedTags(_tags);
          return Promise.resolve(form);
        } catch (err: any) {
          return Promise.reject(err);
        }
      }}
      onSubmitForm={async (form) => {
        try {
          const data = await addForm(form);
          await addBangumiTagItemBatch(data.id, selectedTags);
        } catch (err: any) {
          return Promise.reject(err);
        }
      }}
      onUpdateForm={async (form) => {
        try {
          await updateForm(form);
          const isArrayEqual = (arr1: string[], arr2: string[]) => {
            return arr1.length == arr2.length && arr1.every((v, i) => v === arr2[i]);
          }
          if (!isArrayEqual(selectedTags, originSelectedTags)) { // 当标签未更改时无需更新标签
            await updateBangumiTagItemBatch(form.id, selectedTags);
          }
        } catch (err: any) {
          return Promise.reject(err);
        }
      }}
      formHook={formHook}
      formItemsProps={[
        {
          name: 'uid',
          hidden: true,
          children: <Input />
        },
        {
          name: 'title',
          label: '标题',
          children: <Input allowClear />
        },
        {
          name: 'originTitle',
          label: '原标题',
          children: <Input allowClear />
        },
        {
          name: 'releaseDate',
          label: '上映日期',
          children: <DatePicker format={'YYYY-MM-DD'} />,
        },
        {
          name: 'channelId',
          label: '所属频道',
          children: (
            <Select
              options={channelList} 
              onSelect={(value: string) => setChannelId(value)}
              onClear={() => setChannelId(undefined)}
              onChange={(value) => {
                setChannelId(value);
                formHook.setFieldsValue({
                  typeId: '',
                  gradeId: '',
                });
                setSelectedTags([]);
              }}
            />
          ),
        },
        {
          name: 'typeId',
          label: '类型',
          hidden: channelId === undefined,
          children: <Select options={typeList} />
        },
        {
          name: 'gradeId',
          label: '分级',
          hidden: channelId === undefined,
          children: <Select options={gradeList} />
        },
        {
          label: '标签',
          hidden: channelId === undefined,
          children: (
            <Select
              mode={"multiple"}
              value={selectedTags}
              options={tagList}
              onChange={(value) => setSelectedTags(value)}
            />
          )
        },
        {
          name: 'country',
          label: '国家和地区',
          children: 
          <Select allowClear>
            {countryList.map(item => (
              <Option key={item.code} value={item.code}>{item.nameZh}</Option>
            ))}
          </Select>
        },
        {
          name: 'status',
          label: '状态',
          children: <Select options={statusList}/>
        },
        {
          name: 'cover',
          label: '封面',
          children: <SingleImageUpload width={270} height={360} />
        },
        {
          name: 'description',
          label: '描述',
          children: <TextArea rows={5} />
        }
      ]}
      updateFormHook={updateFormHook}
      updateFormItemsProps={[
        {
          name: 'id',
          label: 'ID',
          hidden: true,
          children: <Input allowClear />
        },
        {
          name: 'title',
          label: '标题',
          children: <Input allowClear />
        },
        {
          name: 'originTitle',
          label: '原标题',
          children: <Input allowClear />
        },
        {
          name: 'releaseDate',
          label: '上映日期',
          children: <DatePicker format={'YYYY-MM-DD'} />,
        },
        {
          name: 'channelId',
          label: '所属频道',
          children: (
            <Select
              options={channelList} 
              onSelect={(value: string) => setChannelId(value)}
              onClear={() => setChannelId(undefined)}
              onChange={(value) => {
                setChannelId(value);
                updateFormHook.setFieldsValue({
                  typeId: '',
                  gradeId: '',
                });
                setSelectedTags([]);
              }}
            />
          ),
        },
        {
          name: 'typeId',
          label: '类型',
          hidden: channelId === undefined,
          children: <Select options={typeList} />
        },
        {
          name: 'gradeId',
          label: '分级',
          hidden: channelId === undefined,
          children: <Select options={gradeList} />
        },
        {
          label: '标签',
          hidden: channelId === undefined,
          children: (
            <Select
              mode={"multiple"}
              value={selectedTags}
              options={tagList}
              onChange={(value) => setSelectedTags(value)}
            />
          )
        },
        {
          name: 'country',
          label: '国家和地区',
          children: 
          <Select allowClear>
            {countryList.map(item => (
              <Option key={item.code} value={item.code}>{item.nameZh}</Option>
            ))}
          </Select>
        },
        {
          name: 'status',
          label: '状态',
          children: <Select options={statusList}/>
        },
        {
          name: 'cover',
          label: '封面',
          children: <SingleImageUpload width={270} height={360} />
        },
        {
          name: 'description',
          label: '描述',
          children: <TextArea rows={5} />
        }
      ]}
    />
  )
}

export default VideoBangumiEditPage;