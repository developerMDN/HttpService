import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { AppError } from '../common/app-error';
import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { GetewayTimeOut } from './../common/geteway-time-out';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpHeaders: HttpHeaders;
  options: any;

  constructor(private url: string, private http: HttpClient) {

    this.httpHeaders = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8'
    });

    this.options = { headers: this.httpHeaders };

  }

  get() {

    return this.http.get(this.url)
      .pipe(catchError(this.handlerError));
  }

  create(data: any) {

    return this.http.post(this.url, data, this.options)
      .pipe(catchError(this.handlerError));

  }

  update(data: any) {

    return this.http.put(this.url, data, this.options)
      .pipe(catchError(this.handlerError));

  }

  delete(id: number) {

    return this.http.delete(`${this.url}/${id}`, this.options)
      .pipe(catchError(this.handlerError));

  }

  private handlerError(error: Response) {

    if (error.status === 400) {
      return throwError(new BadInput(error));
    }

    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    }

    if (error.status === 504) {
      return throwError(new GetewayTimeOut(error));
    }

    return throwError(new AppError(error));
  }

}
