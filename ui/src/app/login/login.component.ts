import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    form:FormGroup;
    error = '';

    constructor(@Inject(FormBuilder) fb:FormBuilder,
        private authService: AuthService,
        private router: Router) {

        this.form = fb.group({
            email: ['',Validators.required],
            password: ['',Validators.required]
        });
    }

    login() {
        const val = this.form.value;

        if (val.email && val.password) {
            this.authService.login(val.email, val.password)
                .subscribe( result => {
                    console.log(result);
                    if (result == true) {
                        console.log("User is logged in");
                        this.router.navigateByUrl('/');
                    } else {
                        this.error = 'Username or password is incorrect';
                    }
                });
        }
    }

    get email() { return this.form.get('email'); }

    get password() { return this.form.get('password'); }

    ngOnInit() {
    }

}
