import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    public posts: Array<any> = [
    {text: 'A few posts'},
    {text: 'Some important content'},
  ];

    addPost(postText: string) {
        this.posts.unshift({text: postText});
    }
}
