import { Component } from '@angular/core';
import { PostService } from './post.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor(private postService: PostService,
                private authService: AuthService,
                private router: Router) {

    }

    logout() {
        this.authService.logout();
        console.log("User is logged out");
        this.router.navigateByUrl('/login');

    }
}
