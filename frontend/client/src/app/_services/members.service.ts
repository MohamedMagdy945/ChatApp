import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../_models/member';

const user = localStorage.getItem('user');
const token = user ? JSON.parse(user).token : null;

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: token ? 'Bearer ' + token : '',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }
  getMember(username) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
}
