let tempLoading: any = null,
  configRequest: any = null;
import axios from 'axios';
import { depend } from './common';
export const httpRequest: any = axios.create();
// 请求前处理函数
export const configRequestFunction = (config: any) => {
  if (config.once && !configRequest) {
    config.once -= 1;
    configRequest = config;
  } else {
    configRequest = null;
  }
  if (config.loading) {
    tempLoading = depend.loading({
      text: config.loading,
      background: 'rgba(0,0,0,.8)'
    });
  }
  config.headers = Object.assign(
    depend.headers,
    {
      'Content-Type': 'application/json'
    },
    config.headers
  );

  return config;
};
// 请求成功处理
export const httptResponseFunction = async (response: object) => {
  const { config, data, status, statusText }: any = response;
  let result: any = {
    code: data.code || status,
    data: data.data || data,
    message: data.errorMessage || data.msg || statusText
  };

  const statusCode = ['1', '200'].includes(String(result.code));
  // 数据响应提示
  config.showMessage &&
    depend.message({
      type: statusCode ? 'success' : 'error',
      duration: 5000,
      message: result.message
    });
  // 关闭loading
  tempLoading && tempLoading.close();
  return statusCode ? Promise.resolve(result) : Promise.reject(result);
};

// 请求失败处理函数
export const httpErrorFunction = async (error: object) => {
  console.log(888888);
  const { message, config, status } = JSON.parse(JSON.stringify(error));
  if (status == 401) {
    depend.router.push('/login');
    return false;
  }
  await depend.message({
    type: 'error',
    duration: 5000,
    message
  });
  // 关闭loading
  tempLoading && tempLoading.close();
  // 重新请求
  if (config && config.once && configRequest) {
    httpRequest.request(config);
  }
  return error;
};
