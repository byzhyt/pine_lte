import { depend } from './common';
export * as request from './request';
export * as common from './common';

export class createConfig {
  constructor(data: any) {
    for (let name in data) {
      depend[name] = data[name];
    }
  }
}

new createConfig({});
