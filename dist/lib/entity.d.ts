export interface RequestEntity {
    url: string;
    prefix: string;
    type: string;
    data: object | null;
    loading: string;
    showMessage: string;
    headers: object;
    queer: boolean;
    request: string;
    fileType: string;
    filePath: string;
    name: string;
    once: number;
}
export interface LableValueEntity {
    label: string;
    value: string;
    storage: string;
    static: string;
}
export interface loadEntity {
    load: RequestEntity;
    name: string;
    rreq: Array<LableValueEntity>;
    nonstop: LableValueEntity;
    multiple: boolean;
    request: string;
    storage: string;
}
export interface ImageEntity {
    icon: string;
    className: string;
    path: string;
    lazy: boolean;
    fit: string;
    alt: string;
    preview: boolean;
}
export interface UploadEntity {
    placeholder: string;
    name: "";
}
export interface FormsEntity {
    inline: boolean;
    rules: object;
    loads: Array<loadEntity>;
    data: object;
    items: Array<any>;
    className: string;
    disabled: boolean;
    labelPosition: string;
    statusIcon: boolean;
    labelWidth: string;
    showMessage: boolean;
    inlineMessage: boolean;
    span: number;
    gutter: number;
}
export interface SublevelEntity {
    name: string;
    type: string;
    eltype: string;
    label: string;
    disabled: boolean;
    placeholder: string;
    component: string;
    params: Array<LableValueEntity>;
    path: string;
    props: LableValueEntity;
    className: string;
    list: Array<any>;
    labelStyle: string;
    labelClassName: string;
    itemClassName: string;
    itemStyle: string;
    iconClassName: string;
    iconStyle: string;
    visible: boolean;
    multiple: boolean;
    request: string;
    rreq: Array<LableValueEntity>;
    control: Array<LableValueEntity>;
}
export interface ItemEntity {
    name: string;
    type: string;
    eltype: string;
    label: string;
    disabled: boolean;
    placeholder: string;
    component: string;
    params: Array<LableValueEntity>;
    path: string;
    props: LableValueEntity;
    className: string;
    list: Array<any>;
    labelStyle: string;
    labelClassName: string;
    itemClassName: string;
    itemStyle: string;
    iconClassName: string;
    iconStyle: string;
    visible: boolean;
    multiple: boolean;
    request: string;
    rreq: Array<LableValueEntity>;
    control: Array<LableValueEntity>;
}
