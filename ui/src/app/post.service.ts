import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }
 
  get() {
      return this.http.get(`/api/posts/`);
  }

  add(payload) {
      return this.http.post(`/api/posts/`, {content: payload});
  }

  remove(payload) {
    return this.http.delete(`/api/posts/${payload.id}`);
  }

  update(payload) {
    return this.http.patch(`/api/posts/${payload.id}`, payload);
  }
}
