import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }
 
  get() {
      return this.http.get(`/api/posts/`);
      /*  TODO - catch 401 errors and log out the user
          .catch((err: HttpErrorResponse) => {
              console.error('An error occurred retrieving posts:', err.error);
              return Observable.of<any>();
          });
       */
  }

  add(payload) {
      return this.http.post(`/api/posts/`, payload);
  }

  remove(payload) {
      const url = new URL(payload.url);
      return this.http.delete(url.pathname);
  }

  update(payload) {
      const url = new URL(payload.url);
      return this.http.patch(url.pathname, payload);
  }

  like(post) {
      const postUrl = new URL(post.url);
      return this.http.post('/api/likes/', { 'post': postUrl.pathname});
  }

  unlike(like) {
      const likeUrl = new URL(like.url);
      return this.http.delete(likeUrl.pathname);
  }
}
