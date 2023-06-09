import type { RequestEntity } from './entity';
import { jsonToGetData } from './common';
import {
  httpRequest,
  configRequestFunction,
  httptResponseFunction,
  httpErrorFunction
} from './axiosConfig';
httpRequest.interceptors.request.use(configRequestFunction, (error: any) => Promise.reject(error));
httpRequest.interceptors.response.use(httptResponseFunction, httpErrorFunction);
// 请求参数组合
export const paramsConfig = (options: RequestEntity): object => {
  const { url, prefix, queer, type, data, loading, once, showMessage, headers } = options;
  let path = '';
  if (queer) {
    path = `${prefix || ''}${url}?${jsonToGetData(data || {})}`;
  } else {
    path = `${prefix || ''}${url}`;
  }
  return {
    url: path,
    method: type,
    params: ['get', 'delete', 'head'].includes(type) ? data : null,
    data: ['post', 'put', 'patch'].includes(type) ? data : null,
    loading,
    showMessage,
    headers,
    once
  };
};

export default async (options: any) => await httpRequest.request(paramsConfig(options));
