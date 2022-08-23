import qs from "qs";
import { post, get, put, del, request } from "../request";
import { getUserInfo } from "../auth/user";

export const addForm = async (form: Record<string, any>): Promise<any> => {
  try {
    await post('/video/series', form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getInitForm = async (): Promise<Record<string, any>> => {
  try {
    const { id: uid } = await getUserInfo();
    return Promise.resolve({
      uid,
      name: '',
      description: '',
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getForm = async (id?: string | number): Promise<Record<string, any>> => {
  try {
    if (id === undefined) { return Promise.reject("The 'id' is undefined"); }
    const form = await get<Record<string, any>, any>(`/video/series/form/${id}`);
    return Promise.resolve(form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getList = async (keyword?: string): Promise<Record<string, any>[]> => {
  try {
    const { id: uid } = await getUserInfo();
    const data = await get(`/video/series`, {
      params: {uid, key: keyword || ""}
    });
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getRecords = async (keyword: string, pageNum: number, pageSize: number): Promise<{total: number, records: object[]}> => {
  try {
    const { id: uid } = await getUserInfo();
    const { total, records } = await get<{total: number, records: object[]}, any>('/video/series/page', {
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
    await put('/video/series', form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const deleteRecord = async (value: any, record: any, index: number): Promise<any> => {
  try {
    await del(`/video/series/${record.id}`);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const deleteRecords = async (selectedRowKeys: any[], selectedRows: any[]): Promise<any> => {
  try {
    const params = { ids: selectedRowKeys };
    await request('/video/series/batch', {
      method: 'delete',
      params,
      paramsSerializer: (params: any) => qs.stringify(params, { indices: false }),
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export declare type SeriesItemProps = Record<string, any>;
export const addSeriesItem = async (form: SeriesItemProps) : Promise<any> => {
  try {
    await post<any, SeriesItemProps>('/video/series_item', form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getSeriesList = async (params: Record<string, any>) => {
  try {
    return Promise.resolve(await get<SeriesItemProps[], any>('/video/series_item', {params}));
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getSeriesItemRecords = async (keyword: string, pageNum: number, pageSize: number, seriesId?: string): Promise<{total: number, records: object[]}> => {
  try {
    const { total, records } = await get<{total: number, records: object[]}, any>('/video/series_item/page', {
      params: {
        key: keyword,
        page_num: pageNum,
        page_size: pageSize,
        series_id: seriesId,
      }
    });
    return Promise.resolve({total, records});
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const updateSeriesItemForm = async (form: SeriesItemProps): Promise<any> => {
  try {
    await put('/video/series_item', form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const updateSeriesItemsOrderInSeries = async (forms: SeriesItemProps[]): Promise<any> => {
  try {
    await put('/video/series_item/order', forms);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const deleteSeriesItemRecord = async (value: any, record: any, index: number): Promise<any> => {
  try {
    await del(`/video/series_item/${record.id}`);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const deleteSeriesItemRecords = async (selectedRowKeys: any[], selectedRows: any[]): Promise<any> => {
  try {
    const params = { ids: selectedRowKeys };
    await request('/video/series_item/batch', {
      method: 'delete',
      params,
      paramsSerializer: (params: any) => qs.stringify(params, { indices: false }),
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}