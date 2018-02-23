import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public posts: Array<any> = [];

    constructor(private postService: PostService,
                private authService: AuthService) {
        postService.get().subscribe((posts: any) => this.assignPosts(posts));
    }

    assignPosts(posts: Array<any>) {
        console.log(this.posts);
        this.posts = posts;
        console.log(this.posts);
    }

    addPost(postText: string) {
        this.posts.unshift({content: postText});
        console.log(this.posts);
    }

    ngOnInit() {
    }

}
