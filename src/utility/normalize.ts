import { UploadFile } from '@pankod/refine-antd';

interface UploadResponse {
  _id: string;
  key: string;
  url: string;
}
interface EventArgs<T = UploadResponse> {
  file: UploadFile<T>;
  fileList: Array<UploadFile<T>>;
}

export const normalizeFile = (event: EventArgs, images: Array<UploadFile>) => {
  const { fileList } = event;
  console.log(images);
  return fileList.map((item) => {
    const { uid, name, response, type, size, percent, status } = item;

    const image = images.find(({ uid }) => uid === item.uid);

    return {
      id: response?._id || image?.response._id,
      url: item.url || response?.url,
      uid,
      name,
      type,
      size,
      percent,
      status,
    };
  });
};
