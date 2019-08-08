import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: any;
  url: string;
  urlPost: string;
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.url = 'https://jsonplaceholder.typicode.com/todos';
    this.urlPost = 'posts';

    this.httpHeaders = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8'
    });


  }

  createPost(title: string) {
    const post = { title };
    const options = { headers: this.httpHeaders };

    debugger;
    this.http.post(this.urlPost, post, options)
      .subscribe(response => {
        console.log('RESPONSE: ', response);
      });
  }

}
