import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    public posts: Array<any> = [
    {text: 'Post 1'},
    {text: 'Post 2'},
    {text: 'Post 3'},
    {text: 'Post 4'},
    {text: 'Post 5'},
    {text: 'Post 6'},
    {text: 'Post 7'},
    {text: 'Post 8'},
    {text: 'Post 9'},
    {text: 'Post 10'},
  ];
}
