import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any;
  url: string;
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private service: PostsService) {
    this.url = 'api/post';

    this.httpHeaders = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8'
    });

  }

  ngOnInit() {
    this.http.get(this.url)
      .subscribe(response => {
        this.posts = response;
        console.log(this.posts);
      }, (error) => console.log(error), () => console.log('¡Ready!'));

  }

  createPost(title: HTMLInputElement) {

    const post = { title: title.value };
    const options = { headers: this.httpHeaders };

    this.http.post(this.url, post, options).subscribe( response => console.log(response));

  }

}
