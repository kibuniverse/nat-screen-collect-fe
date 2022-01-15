import axios from 'axios';
import { obj2UrlParams } from '@/utils/obj2urlparams';
/**
 *
 * @param props formDate
 * @returns 上传截图已经相关信息
 */
export const uploadNatImage = async (props: FormData) =>
  axios.post('http://192.168.1.116:3000/api/upload', props, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

/**
 *
 * @returns 获取已经上传的天数
 */
export const getUploadedDate = async () =>
  axios.get<string[]>('http://192.168.1.116:3000/api/uploadedDate');

export const getClassesDayInfo = async (params: API.GetClassesDayInfoParam) => {
  const paramString = obj2UrlParams(params);
  return axios.get<API.GetClassesDayInfoResult>(
    `http://192.168.1.116:3000/api/classResult?${paramString}`,
  );
};
