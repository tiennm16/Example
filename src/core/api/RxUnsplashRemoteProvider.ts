import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import {Observable, Observer} from 'rxjs';
import {RemoteException} from '../error';
import {RxRemoteProvider} from './RxRemoteProvider';

export class RxUnsplashProviderException extends RemoteException<AxiosError> {}

export class RxUnsplashProvider implements RxRemoteProvider {
  private readonly axiosInstance: AxiosInstance;

  constructor(private readonly token: string) {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.unsplash.com/',
      headers: {
        Authorization: `Client-ID ${token}`,
      },
    });
  }

  request<T>(requestConfig: AxiosRequestConfig): Observable<AxiosResponse<T>> {
    return Observable.create(async (observer: Observer<AxiosResponse<T>>) => {
      try {
        const result = await this.axiosInstance.request(requestConfig);
        setTimeout(() => {
          observer.next(result);
          observer.complete();
        }, 500);
      } catch (error) {
        observer.error(new RxUnsplashProviderException(error));
      }
    });
  }

  post<T>(url: string, data: any): Observable<AxiosResponse<T>> {
    return this.request({
      method: 'POST',
      data,
      url,
    });
  }
  get<T>(url: string): Observable<AxiosResponse<T>> {
    return this.request({
      method: 'GET',
      url,
    });
  }
  put<T>(url: string, data: any): Observable<AxiosResponse<T>> {
    return this.request({
      method: 'PUT',
      data,
      url,
    });
  }
  delete<T>(url: string): Observable<AxiosResponse<T>> {
    return this.request({
      method: 'DELETE',
      url,
    });
  }
}
