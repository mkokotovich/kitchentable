import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import * as moment from "moment";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

export class User {
    constructor() {}
}

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

        /*
    login(username:string, password:string ) {
        return this.http.post<User>('/api/token-auth/', {username, password})
        //return this.http.post('/api/login', {email, password})
            .do(res => this.setSession)
            .shareReplay();
    }
         */

    login(username: string, password: string): Observable<boolean> {
        return this.http.post<any>('/api/token-auth/', { username: username, password: password })
            .catch((err: HttpErrorResponse) => {
                console.error('An error occurred on login:', err.error);
                return Observable.of<boolean>(false);
            })
            .map(response => {
                // login successful if there's a jwt token in the response
                var token = response.token;
                if (token) {
                    localStorage.setItem('id_token', token);

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    private setSession(authResult) {
        console.log(authResult)
        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn(): Boolean {
        var id_token = localStorage.getItem("id_token");
        return !!id_token;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
