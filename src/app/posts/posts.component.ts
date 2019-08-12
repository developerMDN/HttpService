import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
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

    this.service.get()
      .subscribe(response => this.posts = response);

  }

  createPost(input: HTMLInputElement) {

    const post = { Title: input.value, id: 0 };
    this.posts.splice(0, 0, post);

    this.service.create(post)
      .subscribe({
        next: null,
        error: (error: AppError) => {

          this.posts.splice(0, 1);

          if (error instanceof BadInput) {
            console.log('BADINPUT.');
          } else {
            throw error;
          }
        },
        complete: () => input.value = ''
      });

  }

  updatePost(post: any, input: HTMLInputElement) {

    post.Title = input.value;

    input.value = '';

    this.service.update(post)
      .subscribe(() => {
        const index = this.posts.indexOf(post);
        this.posts.splice(1, index, post);
      });

  }

  deletePost(post: any) {

    const index = this.posts.indexOf(post);
    this.posts.splice(1, index);

    this.service.delete(post.Id)
      .subscribe(
        () => null,
        (error: AppError) => {
          this.posts.splice(1, index, post);
          if (error instanceof NotFoundError) {
            console.log('Este post no existe.');
          } else {
            throw error;
          }
        },
        () => console.log('')
      );

  }

}
