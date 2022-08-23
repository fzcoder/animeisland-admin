import qs from "qs";
import { post, get, put, del, request } from "../request";
import { getUserInfo } from "../auth/user";

export const addForm = async (form: Record<string, any>): Promise<any> => {
  try {
    await post('/video/item', form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const addFormBatch = async (forms: Record<string, any>[]): Promise<any> => {
  try {
    await post('/video/item/batch', forms);
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
      description: '',
      poster: '',
      srcList: [],
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getForm = async (id?: string | number): Promise<Record<string, any>> => {
  try {
    if (id === undefined) { return Promise.reject("The 'id' is undefined"); }
    const form = await get<Record<string, any>, any>(`/video/item/form/${id}`);
    return Promise.resolve(form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getVideoItemWithPlayList = async (id?: string | number): Promise<Record<string, any>> => {
  try {
    if (id === undefined) { return Promise.reject("The 'id' is undefined"); }
    const form = await get<Record<string, any>, any>(`/video/item/play/${id}`);
    return Promise.resolve(form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getRecords = async (keyword: string, pageNum: number, pageSize: number): Promise<{total: number, records: Record<string, any>[]}> => {
  try {
    const { id: uid } = await getUserInfo();
    const { total, records } = await get<{total: number, records: Record<string, any>[]}, any>('/video/item/page', {
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

export const updateForm = async (form: Record<string, any>): Promise<any> => {
  try {
    await put('/video/item', form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const deleteRecord = async (value: any, record: any, index: number): Promise<any> => {
  try {
    await del(`/video/item/${record.id}`);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const deleteRecords = async (selectedRowKeys: any[], selectedRows: any[]): Promise<any> => {
  try {
    const params = { ids: selectedRowKeys };
    await request('/video/item/batch', {
      method: 'delete',
      params,
      paramsSerializer: (params: any) => qs.stringify(params, { indices: false }),
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}