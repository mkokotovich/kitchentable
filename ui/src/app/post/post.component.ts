import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    @Input() post:any;
    @Output() postDelete = new EventEmitter<any>();

    constructor(private authService: AuthService) { }

    ngOnInit() {
    }

    canDelete() {
        // TODO allow admin to delete everything
        return this.authService.isCurrentUser(this.post.owner);
    }

    deletePost() {
        this.postDelete.emit(this.post);
    }
}
