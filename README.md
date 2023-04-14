# pine lte

## Project setup

```
npm install pine-lte
```

##常用方法

```
补全两位数         fillNumber(1)
判断是否是JSON对象 isObject
数组去重           arrayToOnly
JSON转get数据      jsonToGetData
get转json数据      getDataToJSON
获取随机数         random
设置有位数随机数    randomText
```

##axios 请求二次封装
* [参数介绍](./src/entity.ts)
RequestEntity
```
    request({
        url: '/oauth/token',
        type: 'post',
        loading: '登录中...',
        showMessage: true,
        prefix: '/auth',
    })
```
