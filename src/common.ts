import { LableValueEntity, RequestEntity } from './entity';
export const dataEmpty = (item: any) => {
  const emptyJson: any = {
    b: false,
    s: '',
    a: [],
    n: null,
    m: 0,
    o: {}
  };
  return emptyJson[item.dataType || 's'];
};

export const depend: any = {
  router: (data) => data,
  message: (data) => data,
  loading: (data) => data,
  userInfo: {},
  headers: {}
};

export const getName = (item: any) => {
  return item.request || item.name;
};

// 设置参数值
export const isNull = (data: any, item: any) => {
  if ([null, undefined].includes(data)) {
    return dataEmpty(item);
  } else {
    return data;
  }
};

// 补全两位数
export const fillNumber = (n: number | string) => {
  return Number(n) < 10 ? '0' + n : n;
};
// 判断是否是JSON对象
export const isObject = (val: any) => {
  if (Object.isExtensible(val) && !Array.isArray(val)) {
    return true;
  } else {
    return false;
  }
};

// 查找json指定的数据
export const findObjectValue = (datas: any, name: string) => {
  let value: any = '';
  const names = name.split('.');
  const getStringValue = async (data: any) => {
    names.map((cname) => {
      if (isObject(data)) {
        Object.keys(data).map((kname) => {
          if (kname == cname) {
            value = data[cname];
          } else {
            if (Array.isArray(data[cname])) {
              data[cname].map((sitem: any) => {
                getStringValue(sitem);
              });
            } else {
              getStringValue(data[cname]);
            }
          }
        });
      }
    });
  };
  getStringValue(datas);
  return value;
};

// 数组去重
export const arrayToOnly = (list: Array<string | number | object>) => {
  const empson: any = {};
  return list.reduce((item: any, next: any) => {
    if (next instanceof Object) {
      empson[next.id] ? '' : (empson[next.id] = true) && item.push(next);
    } else {
      empson[next] ? '' : (empson[next] = true) && item.push(next);
    }
    return item;
  }, []);
};

// JSON转get数据
export const jsonToGetData = (data: any) => {
  let tempjson = '';
  for (const name in data) {
    if (name) {
      tempjson += `${name}=${isNull(data[name], { dataType: 's' })}&`;
    }
  }
  return tempjson.replace(/\&$/, '');
};
// get转json数据
export const getDataToJSON = (data: string) => {
  const shref: string = decodeURIComponent(data).replace(/\S+\?/, '');
  const tempjson: any = {};
  shref.split('&').map((item) => {
    const arr = item.split('=');
    tempjson[arr[0]] = arr[1];
  });
  return tempjson;
};

// 获取随机数
export const random = (s: string | number, e: string | number) => {
  const m = Number(s),
    n = Number(e);
  return Math.floor(Math.random() * (m - n) + n);
};
// 设置有位数随机数
export const randomText = (len: number = 20) => {
  let result: string = '';
  for (let i = 0; i < len; i++) {
    if (random(0, 3)) {
      result += random(0, 10);
    } else {
      result += String.fromCharCode(97 + random(0, 26));
    }
  }
  return result;
};

// 请求数据处理
export const beforeAxiosEnter = (item: any, datas: any) => {
  const userInfo: any = depend.userInfo;
  const load: RequestEntity = item.load || {};
  const rreq: any = item.rreq;
  const nonstop: LableValueEntity = item.nonstop;
  if (Object.isExtensible(rreq) && rreq.label) {
    if (rreq.storage) {
      load.url = load.url.replace(/rreq/g, userInfo[rreq.label]);
    } else if (rreq.static) {
      load.url = load.url.replace(/rreq/g, rreq.value);
    } else {
      load.url = load.url.replace(/rreq/g, datas[rreq.label]);
    }
  }
  const tempjson: any = {
    ...load,
    data: {}
  };
  if (Array.isArray(item.params)) {
    item.params.map((pitem: any) => {
      if (pitem.storage) {
        tempjson.data[pitem.label] = isNull(userInfo[pitem.value], pitem);
      } else if (pitem.static) {
        tempjson.data[pitem.label] = pitem.value;
      } else {
        tempjson.data[pitem.label] = isNull(datas[pitem.value], pitem);
      }
    });
  }
  // 特殊请求包体
  if (Object.isExtensible(nonstop)) {
    if (nonstop.storage) {
      tempjson.data = [isNull(userInfo[nonstop.label], nonstop)];
    } else if (nonstop.static) {
      tempjson.data = [nonstop.value];
    } else {
      tempjson.data = [isNull(datas[nonstop.label], nonstop)];
    }
  }

  tempjson.data = Object.assign({}, datas, tempjson.data);
  // 怪异请求
  if (item.queer && tempjson.type == 'post') {
    tempjson.url = `${tempjson.url}?${jsonToGetData(tempjson.data)}`;
    delete tempjson.data;
  }
  return tempjson;
};

export const validation = {
  // 手机号
  phone: /^1[3-5,7-9]\d{9}$/,
  // 座机号码
  tel: /(^0[1-9]{2,3}\d{7,8}$)|(^[1-9]\d{6,7}$)/,
  // 整数
  inter: /(^[1-9]+$)|(^[1-9]\d+$)/,
  // 浮点数
  float: /(^0\.\d{1,2}$)|(^[1-9]\d+\.\d{1,2}$)/,
  // 身份证
  iden: /(^[1-9]{3}[A-Z,1-9]$)/,
  // 信用卡
  credit: /^4$/,
  // 银行卡
  bank: /(^62\d{16}|\d{19}|\d{13}|\d{17}$)|(^[37,34]\d{13}$)|(^[30,36,38,39]\d{12}$)|(^5[1-5]\d{14}$)|(^4\d{15}$)/,
  // 日期
  date: /(^[1,2]\d{3}?\-(0[1-9]|[1-9]|1[0,1,2])\-(0[1-9]|1[1-9]|2[1-9]|3[0,1])\s([])$)/,
  // 文本信息
  content: /\S+/
};

// 判断设备
export const getAppVersion = () => {
  const { appVersion }: any = window.navigator;
  if (['iPhone', 'Android', 'iPad'].includes(appVersion) || window.innerWidth < 760) {
    return 'app';
  } else {
    return 'pc';
  }
};

// 获取样式
export const getStyle = (el: any, style: string) => {
  if (typeof getComputedStyle) {
    return getComputedStyle(el, null).getPropertyValue(style);
  } else {
    return el.currentStyle.getAttribute(style);
  }
};
