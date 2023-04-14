import { depend } from './common';
export * as request from './request';
export * as common from './common';

export class createConfig {
  [x: string]: any;
  constructor(data: any) {
    for (const name in data) {
      this[name] = data[name];
      depend[name] = data[name];
    }
  }
}
