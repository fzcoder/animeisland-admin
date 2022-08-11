import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, message, Radio, List, Input, Descriptions, Image, Space, Tag, Select, } from "antd";
import {
  getGradeList,
  getTypeList,
  getStatusList,
  getRecordsWithCustomParams,
} from "../../../../api/video/bangumi";
import { getYearList, getMonthList } from '../../../../api/utils/date';
const { Search } = Input;

type OptionProps = { label: string, value: string | number };
type QueryParamsProps = {
  key: string,
  page_num: number,
  page_size: number,
  channel_id: string,
  type_id: string,
  grade_id: string,
  release_year: string,
  release_month: string,
  status: number,
}
export declare type VideoBangumiSearchPageProps = {};
const VideoBangumiSearchPage: React.FC<VideoBangumiSearchPageProps> = (props) => {
  const params = useParams();
  const [gradeList, setGradeList] = useState<OptionProps[]>([]);
  const [typeList, setTypeList] = useState<OptionProps[]>([]);
  const [statusList, setStatusList] = useState<OptionProps[]>([]);
  const [yearList, setYearList] = useState<OptionProps[]>([]);
  const [monthList, setMonthList] = useState<OptionProps[]>([]);
  const [queryParams, setQueryParams] = useState<QueryParamsProps>({
    key: "",
    page_num: 1,
    page_size: 10,
    channel_id: params.id || "all",
    type_id: "all",
    grade_id: "all",
    release_year: "all",
    release_month: "all",
    status: -1,
  });
  const [total, setTotal] = useState<number>(0);
  const [dataSource,setDataSource] = useState<Record<string, any>[]>([]);
  const getRecords = async () => {
    try {
      const { total, records } = await getRecordsWithCustomParams(queryParams);
      setDataSource(records);
      setTotal(total);
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
  useEffect(() => {
    (async () => {
      try {
        await getRecords();
      } catch (err: any) {
        message.error(err);
      }
    })();
  },[queryParams]);
  useEffect(() => {
    (async () => {
      try {
        // grade
        const _grades = await getGradeList(params.id || "");
        const _gradeList: OptionProps[] = [];
        _grades.forEach(grade => {
          _gradeList.push({label: grade.name, value: grade.id})
        })
        setGradeList(_gradeList);
        // type
        const _types = await getTypeList(params.id || "");
        const _typeList: OptionProps[] = [];
        _types.forEach(grade => {
          _typeList.push({label: grade.name, value: grade.id})
        })
        setTypeList(_typeList);
        // status
        setStatusList(await getStatusList());
        // year;
        setYearList(await getYearList());
        // month
        setMonthList(await getMonthList());
      } catch (err: any) {
        message.error(err);
      }
    })()
  },[]);
  return (
    <div>
      <div>
        <Form
          initialValues={{
            type_id: "all",
            grade_id: "all",
            status: -1,
            release_year: "all",
            release_month: "all",
          }}
          onValuesChange={(_, allValues) => {
            const _params: QueryParamsProps = {...queryParams, ...allValues};
            setQueryParams(_params);
          }}
        >
          <Form.Item name={"type_id"} label={"类型"}>
            <Radio.Group>
              <Radio value={"all"}>全部</Radio>
              {typeList.map((item, key) => <Radio key={key} value={item.value}>{item.label}</Radio>)}
            </Radio.Group>
          </Form.Item>
          <Form.Item name={"grade_id"} label={"分级"}>
            <Radio.Group>
              <Radio value={"all"}>全部</Radio>
              {gradeList.map((item, key) => <Radio key={key} value={item.value}>{item.label}</Radio>)}
            </Radio.Group>
          </Form.Item>
          <Form.Item name={"status"} label={"状态"}>
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              {statusList.map((item, key) => <Radio key={key} value={item.value}>{item.label}</Radio>)}
            </Radio.Group>
          </Form.Item>
          <Form.Item name={"release_year"} label={"年份"}>
            <Select options={[{label: "全部", value: "all"}, ...yearList]}/>
          </Form.Item>
          <Form.Item name={"release_month"} label={"月份"}>
            <Select options={[{label: "全部", value: "all"}, ...monthList]}/>
          </Form.Item>
        </Form>
      </div>
      <div>
        <List
          dataSource={dataSource}
          pagination={{
            current: queryParams.page_num,
            pageSize: queryParams.page_size,
            total: total,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`,
            onChange: (page_num, page_size) => {
              const _params: QueryParamsProps = {...queryParams, page_num, page_size};
              setQueryParams(_params);
            } 
          }}
          header={
            <Search
              placeholder="请输入关键字"
              onSearch={(value) => {
                const _params: QueryParamsProps = {...queryParams, key: value};
                setQueryParams(_params);
              }}
            />
          }
          renderItem={(item) => (
            <List.Item
              key={item.id}
            >
              <Descriptions bordered column={2} style={{width: "100%"}}>
                <Descriptions.Item label="标题">
                  <a href={`/video/bangumi/details/${item.id}`}>{item.title}</a>
                </Descriptions.Item>
                <Descriptions.Item label="原标题">
                  <span>{item.originTitle}</span>
                </Descriptions.Item>
                <Descriptions.Item label="封面" span={2}>
                  <Image src={item.cover} width={240} />
                </Descriptions.Item>
                <Descriptions.Item label="标签" span={2}>
                  <Space>
                    {item.tags.map((item: Record<string, any>) => {
                      return (
                        <Tag key={item.id} color={item.colorHex}>{item.name}</Tag>
                      )
                    })}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="描述" span={2}>
                  <span>{item.description}</span>
                </Descriptions.Item>
              </Descriptions>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default VideoBangumiSearchPage;