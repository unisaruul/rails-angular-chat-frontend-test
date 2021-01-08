import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  base_url = 'http://localhost:3000';
  session_path = '/api/v1/user/sign_in';
  message_path = '/api/v1/user/room_messages';

  login(user) {
    return this.http.post(this.base_url + this.session_path, {user: user})
  }

  chat(chat) {
    return this.http.post(this.base_url + this.message_path, chat)
  }
}
