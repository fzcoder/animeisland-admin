import { get, post, put, del, request, PageResultSet } from "../request";
import { getUserInfo } from "../auth/user";
import qs from "qs";

export declare type VideoSourceProps = Record<string, any>;

export const addForm = async (form: Record<string, any>): Promise<any> => {
  try {
    await post('/video/source', form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getInitForm = async (videoId: string): Promise<VideoSourceProps> => {
  try {
    const {id: uid} = await getUserInfo();
    return Promise.resolve({
      uid,
      videoId,
      width: '',
      heigth: '',
      quality: '',
      mimeType: '',
      screenshot: '',
      url: ''
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getForm = async (id?: string | number): Promise<VideoSourceProps> => {
  try {
    if (id === undefined) { return Promise.reject("The 'id' is undefined"); }
    const form = await get<VideoSourceProps, any>(`/video/source/${id}`);
    return Promise.resolve(form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getPlay = async (id?: string | number): Promise<VideoSourceProps> => {
  try {
    if (id === undefined) { return Promise.reject("The 'id' is undefined"); }
    const form = await get<VideoSourceProps, any>(`/video/source/play/${id}`);
    return Promise.resolve(form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getRecords = async (key: string, page_num: number, page_size: number, video_id?: string): Promise<PageResultSet<VideoSourceProps>> => {
  try {
    const data = await get<PageResultSet<VideoSourceProps>, any>(`/video/source/page`, {
      params: {
        key,
        page_num,
        page_size,
        video_id,
      }
    });
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getList = async (bangumi_id?: string): Promise<VideoSourceProps[]> => {
  try {
    const data = await get<VideoSourceProps[], any>(`/video/source/list/form?bangumi_id=${bangumi_id}`);
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const updateForm = async (form: VideoSourceProps): Promise<any> => {
  try {
    await put<any, VideoSourceProps>(`/video/source`, form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const updateBatch = async (forms: VideoSourceProps[]) => {
  try {
    if (forms.length > 0) {
      await put('/video/source/batch', forms);
    }
  } catch(err: any) {
    return Promise.reject(err);
  }
}

export const deleteRecord = async (value: any, record: any, index: number): Promise<any> => {
  try {
    await del(`/video/source/${record.id}`);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const deleteRecords = async (selectedRowKeys: any[], selectedRows: any[]): Promise<any> => {
  try {
    const params = { ids: selectedRowKeys };
    await request('/video/source/batch', {
      method: 'delete',
      params,
      paramsSerializer: (params: any) => qs.stringify(params, { indices: false }),
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}