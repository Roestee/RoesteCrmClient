import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';
import { ResultModel } from '../models/result.model';
import { api } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private error: ErrorService
  ) {}

  post<T>(
    apiUrl: string,
    body: any,
    callBack: (res: T, message?: string) => void,
    errorCallBack?: () => void
  ) {
    this.http
      .post<ResultModel<T>>(`${api}/${apiUrl}`, body, {
        headers: {
          Authorization: 'Bearer ' + this.auth.token,
          Accept: 'application/json',
        },
      })
      .subscribe({
        next: (res) => {
          if (res.data) {
            callBack(res.data, res.successMessage);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
          if (errorCallBack) {
            errorCallBack();
          }
        },
      });
  }

  get<T>(
    apiUrl: string,
    callBack: (res: T) => void,
    errorCallBack?: () => void
  ) {
    this.http
      .get<ResultModel<T>>(`${api}/${apiUrl}`, {
        headers: {
          Authorization: 'Bearer ' + this.auth.token,
        },
      })
      .subscribe({
        next: (res) => {
          if (res.data) {
            callBack(res.data);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
          if (errorCallBack) {
            errorCallBack();
          }
        },
      });
  }

  put<T>(
    apiUrl: string,
    body: any,
    callBack: (res: T, message?: string) => void,
    errorCallBack?: () => void
  ) {
    this.http
      .put<ResultModel<T>>(`${api}/${apiUrl}`, body, {
        headers: {
          Authorization: 'Bearer ' + this.auth.token,
        },
      })
      .subscribe({
        next: (res) => {
          if (res.data) {
            callBack(res.data);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
          if (errorCallBack) {
            errorCallBack();
          }
        },
      });
  }

  delete<T>(
    apiUrl: string,
    id: string,
    callBack: (res: T, message?: string) => void,
    errorCallBack?: () => void
  ) {
    this.http
      .delete<ResultModel<T>>(`${api}/${apiUrl}/${id}`, {
        headers: {
          Authorization: 'Bearer ' + this.auth.token,
        },
      })
      .subscribe({
        next: (res) => {
          if (res.data) {
            callBack(res.data);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
          if (errorCallBack) {
            errorCallBack();
          }
        },
      });
  }
}
