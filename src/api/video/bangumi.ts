import qs from "qs";
import moment from "moment";
import { post, get, put, del, request } from "../request";
import type { PageResultSet } from "../request";
import { getUserInfo } from "../auth/user";

export declare type BangumiProps = Record<string, any>;
export const addForm = async (form: BangumiProps): Promise<Record<string, any>> => {
  try {
    const _form = {...form};
    _form['releaseDate'] = form.releaseDate.format('YYYY-MM-DD');
    const data = await post<Record<string, any>, BangumiProps>('/video/bangumi', _form);
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getInitForm = async (): Promise<Record<string, any>> => {
  try {
    const { id: uid } = await getUserInfo();
    return Promise.resolve({
      uid,
      title: '',
      originTitle: '',
      description: '',
      releaseDate: '',
      cover: '',
      country: '',
      channelId: '',
      typeId: '',
      gradeId: '',
      status: 1,
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getForm = async (id?: string | number): Promise<Record<string, any>> => {
  try {
    if (id === undefined) { return Promise.reject("The 'id' is undefined"); }
    const form = await get<Record<string, any>, any>(`/video/bangumi/${id}`);
    form['releaseDate'] = moment(form['releaseDate'], 'YYYY-MM-DD');
    return Promise.resolve(form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getView = async (id?: string | number): Promise<Record<string, any>> => {
  try {
    if (id === undefined) { return Promise.reject("The 'id' is undefined"); }
    const data = await get<Record<string, any>, any>(`/video/bangumi/view/${id}`);
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getBangumiList = async (queryParams?: Record<string, any>): Promise<BangumiProps[]> => {
  try {
    const { id: uid } = await getUserInfo();
    const data = await get<BangumiProps[], any>('/video/bangumi', {
      params: {uid, ...queryParams}
    });
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getRecords = async (keyword: string, pageNum: number, pageSize: number): Promise<{total: number, records: object[]}> => {
  try {
    const { id: uid } = await getUserInfo();
    const { total, records } = await get<{total: number, records: object[]}, any>('/video/bangumi/page', {
      params: {
        key: keyword,
        page_num: pageNum,
        page_size: pageSize,
        uid,
      }
    });
    return Promise.resolve({total, records});
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getRecordsWithCustomParams = async (queryParams: Record<string, any>): Promise<{total: number, records: object[]}> => {
  try {
    const { id: uid } = await getUserInfo();
    const { total, records } = await get<{total: number, records: object[]}, any>('/video/bangumi/page', {
      params: {uid, ...queryParams}
    });
    return Promise.resolve({total, records});
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const updateForm = async (form: Record<string, any>): Promise<any> => {
  try {
    const _form = {...form};
    _form['releaseDate'] = form.releaseDate.format('YYYY-MM-DD');
    await put('/video/bangumi', _form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const deleteRecord = async (value: any, record: any, index: number): Promise<any> => {
  try {
    await del(`/video/bangumi/${record.id}`);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const deleteRecords = async (selectedRowKeys: any[], selectedRows: any[]): Promise<any> => {
  try {
    const params = { ids: selectedRowKeys };
    await request('/video/bangumi/batch', {
      method: 'delete',
      params,
      paramsSerializer: (params: any) => qs.stringify(params, { indices: false }),
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}
// Bangumi Type
export declare type BangumiTypeProps = Record<string, any>;
export const addTypeForm = async (form: BangumiTypeProps): Promise<any> => {
  try {
    await post<any, BangumiTypeProps>('/video/bangumi_type', form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getInitTypeForm = async (channelId: string): Promise<BangumiTypeProps> => {
  try {
    const { id: userId } = await getUserInfo();
    return Promise.resolve({
      name: '',
      channelId,
      userId,
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getTypeForm = async (id?: string | number): Promise<BangumiTypeProps> => {
  try {
    if (id === undefined) { return Promise.reject("The 'id' is undefined"); }
    const form = await get<BangumiTypeProps, any>(`/video/bangumi_type/${id}`);
    return Promise.resolve(form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getTypeList = async (channel_id: string): Promise<BangumiTypeProps[]> => {
  try {
    const { id: uid } = await getUserInfo();
    const data = await get(`/video/bangumi_type`, { params: { uid, channel_id } });
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getTypeRecords = async (keyword: string, pageNum: number, pageSize: number, channel_id: string): Promise<PageResultSet> => {
  try {
    const { total, records } = await get<PageResultSet, any>(`/video/bangumi_type/page`, {
      params: {
        key: keyword,
        page_num: pageNum,
        page_size: pageSize,
        channel_id,
      }
    });
    return Promise.resolve({total, records});
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const updateTypeForm = async (form: BangumiTypeProps): Promise<any> => {
  try {
    await put('/video/bangumi_type', form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const deleteTypeRecord = async (value: any, record: any, index: number): Promise<any> => {
  try {
    await del(`/video/bangumi_type/${record.id}`);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const deleteTypeRecords = async (selectedRowKeys: any[], selectedRows: any[]): Promise<any> => {
  try {
    const params = { ids: selectedRowKeys };
    await request('/video/bangumi_type/batch', {
      method: 'delete',
      params,
      paramsSerializer: (params: any) => qs.stringify(params, { indices: false }),
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}
// Bangumi Grade
export declare type BangumiGradeProps = Record<string, any>;
export const addGradeForm = async (form: BangumiGradeProps): Promise<any> => {
  try {
    await post<any, BangumiGradeProps>('/video/bangumi_grade', form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getInitGradeForm = async (channelId: string): Promise<BangumiGradeProps> => {
  try {
    const { id: userId } = await getUserInfo();
    return Promise.resolve({
      name: '',
      iconUrl: '',
      channelId,
      userId,
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getGradeForm = async (id?: string | number): Promise<BangumiGradeProps> => {
  try {
    if (id === undefined) { return Promise.reject("The 'id' is undefined"); }
    const form = await get<BangumiTypeProps, any>(`/video/bangumi_grade/${id}`);
    return Promise.resolve(form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getGradeList = async (channel_id: string): Promise<Record<string, any>[]> => {
  try {
    const { id: uid } = await getUserInfo();
    const data = await get(`/video/bangumi_grade`, { params: { uid, channel_id } });
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getGradeRecords = async (keyword: string, pageNum: number, pageSize: number, channel_id: string): Promise<PageResultSet> => {
  try {
    const { total, records } = await get<PageResultSet, any>(`/video/bangumi_grade/page`, {
      params: {
        key: keyword,
        page_num: pageNum,
        page_size: pageSize,
        channel_id,
      }
    });
    return Promise.resolve({total, records});
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const updateGradeForm = async (form: BangumiGradeProps): Promise<any> => {
  try {
    await put('/video/bangumi_grade', form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const deleteGradeRecord = async (value: any, record: any, index: number): Promise<any> => {
  try {
    await del(`/video/bangumi_grade/${record.id}`);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const deleteGradeRecords = async (selectedRowKeys: any[], selectedRows: any[]): Promise<any> => {
  try {
    const params = { ids: selectedRowKeys };
    await request('/video/bangumi_grade/batch', {
      method: 'delete',
      params,
      paramsSerializer: (params: any) => qs.stringify(params, { indices: false }),
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}
// Bangumi Tag
export declare type BangumiTagProps = Record<string, any>;
export const addTagForm = async (form: BangumiTagProps): Promise<any> => {
  try {
    await post<any, BangumiTagProps>('/video/bangumi_tag', form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getInitTagForm = async (channelId: string): Promise<BangumiTagProps> => {
  try {
    const { id: userId } = await getUserInfo();
    return Promise.resolve({
      name: '',
      colorHex: '#1890ff',
      channelId,
      userId,
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getTagForm = async (id?: string | number): Promise<BangumiTagProps> => {
  try {
    if (id === undefined) { return Promise.reject("The 'id' is undefined"); }
    const form = await get<BangumiTagProps, any>(`/video/bangumi_tag/${id}`);
    return Promise.resolve(form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getTagList = async (channel_id: string): Promise<BangumiTagProps[]> => {
  try {
    const data = await get<BangumiTagProps[], any>(`/video/bangumi_tag`, {params: {channel_id}});
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getTagListWithBangumiId = async (bangumi_id: string): Promise<BangumiTagProps[]> => {
  try {
    const data = await get<BangumiTagProps[], any>(`/video/bangumi_tag`, {params: {bangumi_id}});
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getTagRecords = async (key: string, page_num: number, page_size: number, channel_id: string): Promise<PageResultSet<BangumiTagProps>> => {
  try {
    const { total, records } = await get<PageResultSet<BangumiTagProps>, any>('/video/bangumi_tag/page', {
      params: {
        key,
        page_num,
        page_size,
        channel_id,
      }
    });
    return Promise.resolve({total, records});
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const updateTagForm = async (form: BangumiTagProps): Promise<any> => {
  try {
    await put('/video/bangumi_tag', form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const deleteTagRecord = async (value: any, record: any, index: number): Promise<any> => {
  try {
    await del(`/video/bangumi_tag/${record.id}`);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const deleteTagRecords = async (selectedRowKeys: any[], selectedRows: any[]): Promise<any> => {
  try {
    const params = { ids: selectedRowKeys };
    await request('/video/bangumi_tag/batch', {
      method: 'delete',
      params,
      paramsSerializer: (params: any) => qs.stringify(params, { indices: false }),
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}
// Bangumi Tag Item
export declare type BangumiTagItemProps = Record<string, any>;
export const addBangumiTagItemBatch = async (bangumi_id: string, tagIds: string[]): Promise<any> => {
  try {
    await post('/video/bangumi_tag_item/batch', tagIds, {params: {bangumi_id}});
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const updateBangumiTagItemBatch = async (bangumi_id: string, tagIds: string[]): Promise<any> => {
  try {
    await put('/video/bangumi_tag_item/batch', tagIds, {params: {bangumi_id}});
  } catch (err: any) {
    return Promise.reject(err);
  }
}
// Bangumi Status
export declare type BangumiStatusProps = {label: string, value: number};
export const getStatusList = async (): Promise<BangumiStatusProps[]> => {
  try {
    return Promise.resolve([
      {label: "即将上线", value: 0},
      {label: "连载中", value: 1},
      {label: "已完结", value: 2},
    ]);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getStatus = (statusValue: number): BangumiStatusProps => {
  switch (statusValue) {
    case 0:
      return {label: "即将上线", value: 0};
    case 1:
      return {label: "连载中", value: 1};
    case 2:
      return {label: "已完结", value: 2};
    default:
      return {label: "未知状态", value: statusValue};
  }
}