import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    @Input() post:any;
    @Output() postDelete = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    deletePost() {
        this.postDelete.emit(this.post);
    }
}
