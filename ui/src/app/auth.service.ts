import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

export class User {
    constructor() {}
}

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService) { }

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

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('id_token');
        // Check whether the token is expired and return
        // true or false
        if (!token) {
            return false;
        }
        return !this.jwtHelper.isTokenExpired(token);
    }

    logout() {
        localStorage.removeItem("id_token");
    }

    public isLoggedIn(): Boolean {
        return this.isAuthenticated();
    }

    public isLoggedOut(): Boolean {
        return !this.isLoggedIn();
    }
}
