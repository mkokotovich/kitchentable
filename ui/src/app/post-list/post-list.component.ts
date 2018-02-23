import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
    @Input() posts: Array<any>;
    @Output() postDelete = new EventEmitter();

    constructor() { }

    deletePost(post: any) {
        this.postDelete.emit(post);
    }

    ngOnInit() {
    }

}
