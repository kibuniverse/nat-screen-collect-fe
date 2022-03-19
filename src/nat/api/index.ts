import axios from 'axios';
import { obj2UrlParams } from '@/nat/utils/obj2urlparams';
/**
 *
 * @param props formDate
 * @returns 上传截图已经相关信息
 */
export const uploadNatImage = async (props: FormData) =>
  axios.post('/api/upload', props);

/**
 *
 * @returns 获取已经上传的天数
 */
export const getUploadedDate = async () =>
  axios.get<string[]>('/api/uploadedDate');

export const getClassesDayInfo = async (params: API.GetClassesDayInfoParam) => {
  const paramString = obj2UrlParams(params);
  return axios.get<API.GetClassesDayInfoResult>(
    `/api/classResult?${paramString}`,
  );
};
