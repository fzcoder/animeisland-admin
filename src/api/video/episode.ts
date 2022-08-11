import { get, post, put, del, request, PageResultSet } from "../request";
import qs from "qs";

export declare type EpisodeProps = Record<string, any>;
export const getView = async (id?: string): Promise<EpisodeProps> => {
  try {
    if (id === undefined) return Promise.reject("The id is underfine");
    const data = await get<EpisodeProps, any>(`/video/episode/view/${id}`);
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getRecords = async (key: string, page_num: number, page_size: number, bangumi_id?: string): Promise<PageResultSet<EpisodeProps>> => {
  try {
    const data = await get<PageResultSet<EpisodeProps>, any>(`/video/episode/page`, {
      params: {
        key,
        page_num,
        page_size,
        bangumi_id,
      }
    });
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getList = async (bangumi_id?: string): Promise<EpisodeProps[]> => {
  try {
    const data = await get<EpisodeProps[], any>(`/video/episode/list/form?bangumi_id=${bangumi_id}`);
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const updateForm = async (form: EpisodeProps): Promise<any> => {
  try {
    await put<any, EpisodeProps>(`/video/episode`, form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const updateBatch = async (forms: EpisodeProps[]) => {
  try {
    if (forms.length > 0) {
      await put('/video/episode/batch', forms);
    }
  } catch(err: any) {
    return Promise.reject(err);
  }
}

export const deleteRecord = async (value: any, record: any, index: number): Promise<any> => {
  try {
    await del(`/video/episode/${record.id}`);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const deleteRecords = async (selectedRowKeys: any[], selectedRows: any[]): Promise<any> => {
  try {
    const params = { ids: selectedRowKeys };
    await request('/video/episode/batch', {
      method: 'delete',
      params,
      paramsSerializer: (params: any) => qs.stringify(params, { indices: false }),
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}