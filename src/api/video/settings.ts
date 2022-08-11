import { get, put } from "../request";
import { getUserInfo } from "../auth/user";

export declare type VideoSettingsProps = Record<string, any>;

export const getForm = async (): Promise<VideoSettingsProps> => {
  try {
    const { id: user_id } = await getUserInfo();
    const data = await get<VideoSettingsProps, any>('/video/settings', {params: {user_id}});
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const updateForm = async (form: VideoSettingsProps): Promise<void> => {
  try {
    await put<any, VideoSettingsProps>('/video/settings', form);
  } catch (err :any) {
    return Promise.reject(err);
  }
}