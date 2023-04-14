export declare const dataEmpty: (item: any) => any;
export declare let depend: any;
export declare const getName: (item: any) => any;
export declare const isNull: (data: any, item: any) => any;
export declare const fillNumber: (n: number | string) => string | number;
export declare const isObject: (val: any) => boolean;
export declare const findObjectValue: (datas: any, name: string) => any;
export declare const arrayToOnly: (list: Array<string | number | object>) => any;
export declare const jsonToGetData: (data: any) => string;
export declare const getDataToJSON: (data: string) => any;
export declare const random: (s: string | number, e: string | number) => number;
export declare const randomText: (len?: number) => string;
export declare const beforeAxiosEnter: (item: any, datas: any) => any;
export declare const validation: {
    phone: RegExp;
    tel: RegExp;
    inter: RegExp;
    float: RegExp;
    iden: RegExp;
    credit: RegExp;
    bank: RegExp;
    date: RegExp;
    content: RegExp;
};
export declare const getAppVersion: () => "app" | "pc";
export declare const getStyle: (el: any, style: string) => any;
