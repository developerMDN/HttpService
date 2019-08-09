import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../service/post-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any;

  constructor(private service: PostServiceService) {
  }

  ngOnInit() {

    this.service.getPosts()
      .subscribe(response => this.posts = response);

  }

  createPost(input: HTMLInputElement) {

    const post = { Title: input.value, id: 0 };
    input.value = '';

    this.service.createPost(input.value)
      .subscribe(response => {
        post.id = response as number;
        this.posts.splice(0, 0, post);
      });

  }

  updatePost(post: any, input: HTMLInputElement) {

    post.Title = input.value;

    input.value = '';

    this.service.updatePost(post)
      .subscribe(() => {
        const index = this.posts.indexOf(post);
        this.posts.splice(1, index, post);
      });

  }

  deletePost(post: any) {

    this.service.deletePost(post.Id)
      .subscribe(() => {
        const index = this.posts.indexOf(post);
        this.posts.splice(1, index);
      });

  }

}
