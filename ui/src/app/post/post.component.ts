import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from "../auth.service";
import { PostService } from "../post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    @Input() post:any;
    @Output() postDelete = new EventEmitter<any>();

    constructor(private authService: AuthService,
                private postService: PostService) {
    }

    ngOnInit() {
    }

    canDelete() {
        // TODO allow admin to delete everything
        return this.authService.isCurrentUser(this.post.owner);
    }

    likeCount() {
        return this.post.likes.length;
    }

    deletePost() {
        this.postDelete.emit(this.post);
    }

    findUsersLike() {
        for (let like of this.post.likes) {
            if (this.authService.isCurrentUser(like.owner)) {
                return like;
            }
        }
        return null;
    }

    userHasLiked(): Boolean {
        var like = this.findUsersLike();
        return (like != null);
    }

    likePost() {
        this.postService.like(this.post)
            .subscribe(response => {
                this.post.likes.push(response);
            });
    }

    unlikePost() {
        var like = this.findUsersLike();
        this.postService.unlike(like)
            .subscribe(() => {
                var index = this.post.likes.indexOf();
                this.post.likes.splice(index, 1);
            });
    }
}
