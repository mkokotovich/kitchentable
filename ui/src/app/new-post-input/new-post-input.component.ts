import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-post-input',
  templateUrl: './new-post-input.component.html',
  styleUrls: ['./new-post-input.component.css']
})
export class NewPostInputComponent implements OnInit {

    @Output() onPostAdd = new EventEmitter<string>();

    public newPost: any = {text: ''};

    constructor() { }

    ngOnInit() {
    }

    submitNewPost() {
        this.onPostAdd.emit(this.newPost.text);
        this.newPost.text = '';
    }
}
