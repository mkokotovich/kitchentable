import { Component } from '@angular/core';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    public posts: Array<any> = [
        {content: 'A few posts'},
        {content: 'Some important content'},
    ];

    constructor(private postService: PostService) {
        postService.get().subscribe((posts: any) => this.assignPosts(posts));
    }

    assignPosts(posts: Array<any>) {
        console.log(this.posts);
        this.posts = posts;
        console.log(this.posts);
    }

    addPost(postText: string) {
        this.posts.unshift({content: postText});
    }
}
