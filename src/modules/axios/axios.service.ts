import { Injectable } from '@nestjs/common';

import axiosInstance from './Instance';

@Injectable()
export class AxiosService {
  async Get<T>(url: string): Promise<T | any> {
    try {
      return await axiosInstance.get(url);
    } catch (er: any) {
      return { data: er.message };
    }
  }

  async Patch(url: string): Promise<any> {
    try {
      return await axiosInstance.patch(url);
    } catch (er: any) {
      return { data: er.message };
    }
  }

  async Post<T>(url: string, data: any): Promise<T | any> {
    try {
      return await axiosInstance.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (er: any) {
      return { data: er.message };
    }
  }
}
