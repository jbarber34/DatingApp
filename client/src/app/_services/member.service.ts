import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get<Member[]>(
      this.baseUrl + 'users',
      this.getHttpOptions()
    );
  }

  getMember(username: string) {
    return this.http.get<Member>(
      this.baseUrl + 'users/' + username,
      this.getHttpOptions()
    );
  }

  getHttpOptions() {
    const usersString = localStorage.getItem('user');
    if (!usersString) return;
    const user = JSON.parse(usersString);
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + user.token,
      }),
    };
  }
}
