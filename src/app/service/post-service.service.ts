import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../common/app-error';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  posts: any;
  url: string;
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.url = 'api/post';

    this.httpHeaders = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8'
    });

  }

  getPosts() {

    return this.http.get(this.url);
  }

  createPost(title: string) {

    const post = { Title: title, id: 0 };
    const options = { headers: this.httpHeaders };

    return this.http.post(this.url, post, options);

  }

  updatePost(post: any) {

    const options = { headers: this.httpHeaders };

    return this.http.put(this.url, post, options);

  }

  deletePost(id: numeric) {

    const options = { headers: this.httpHeaders };

    return this.http.delete(`${this.url}/${id}`, options)
    .catch((error: Response)=> {
      if (error.status === 400) {
         return Observable.throw(new AppError());
      } else {
        return Observable.throw(new AppError(error));
      }
    });
  }

}
