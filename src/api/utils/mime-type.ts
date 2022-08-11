export declare type MimeTypeProps = {
  label: string,
  value: string | number,
};
export const getVideoSourceMimeType = (): Promise<MimeTypeProps[]> => {
  try {
    const list: MimeTypeProps[] = [
      { label: "M3U8文件", value: "application/x-mpegURL" },
      { label: "MP4文件", value: "video/mp4" },
      { label: "TS文件", value: "video/MP2T" },
    ];
    return Promise.resolve(list);
  } catch (err: any) {
    return Promise.reject(err);
  }
}