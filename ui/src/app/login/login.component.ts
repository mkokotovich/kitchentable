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
    loginForm:FormGroup;
    signupForm:FormGroup;
    loginError = '';
    signupError = '';
    signupSuccess = '';

    constructor(@Inject(FormBuilder) fb:FormBuilder,
        private authService: AuthService,
        private router: Router) {

        this.loginForm = fb.group({
            loginEmail: ['',Validators.required],
            loginPassword: ['',Validators.required]
        });

        this.signupForm = fb.group({
            signupUsername: ['',Validators.required],
            signupEmail: ['',Validators.required],
            signupPassword: ['',Validators.required],
            signupVerifyPassword: ['',Validators.required]
        });
    }

    login() {
        this.loginError = '';
        this.signupError = '';
        this.signupSuccess = '';

        const val = this.loginForm.value;

        if (val.loginEmail && val.loginPassword) {
            this.authService.login(val.loginEmail, val.loginPassword)
                .subscribe( result => {
                    if (result == true) {
                        console.log("User is logged in");
                        this.router.navigateByUrl('/');
                    } else {
                        console.log(result);
                        this.loginError = 'Username or password is incorrect';
                    }
                });
        } else {
            if (!val.loginEmail) {
                this.loginEmail.markAsDirty()
            }
            if (!val.loginPassword) {
                this.loginPassword.markAsDirty()
            }
        }
    }

    signup() {
        this.signupError = '';
        this.signupSuccess = '';
        this.loginError = '';

        const val = this.signupForm.value;

        if (val.signupUsername && val.signupEmail && val.signupPassword) {
            if (val.signupPassword != val.signupVerifyPassword) {
                this.signupError = 'Passwords do not match';
                return;
            }
            this.authService.signup(val.signupUsername, val.signupEmail, val.signupPassword)
                .subscribe( result => {
                    if (result == true) {
                        console.log("User has signed up");
                        this.signupSuccess = 'Successfully signed up, please log in';
                        this.signupForm.reset();
                    } else {
                        console.log(result);
                        this.signupError = 'Unable to sign up.';
                        if (result.username) {
                            this.signupError += "\n";
                            this.signupError += result.username;
                        }
                        if (result.email) {
                            this.signupError += "\n";
                            this.signupError += result.email;
                        }
                    }
                });
        } else {
            if (!val.signupUsername) {
                this.signupUsername.markAsDirty()
            }
            if (!val.signupEmail) {
                this.signupEmail.markAsDirty()
            }
            if (!val.signupPassword) {
                this.signupPassword.markAsDirty()
            }
        }
    }

    get loginEmail() { return this.loginForm.get('loginEmail'); }
    get loginPassword() { return this.loginForm.get('loginPassword'); }

    get signupUsername() { return this.signupForm.get('signupUsername'); }
    get signupEmail() { return this.signupForm.get('signupEmail'); }
    get signupPassword() { return this.signupForm.get('signupPassword'); }

    ngOnInit() {
    }

}
