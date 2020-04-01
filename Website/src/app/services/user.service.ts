import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  usersUrl = environment.apiUrl + '/users/';

  GetAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.usersUrl);
  }
  
  Get(id: number): Observable<User> {
    return this.httpClient.get<User>(this.usersUrl + id);
  }

  Add(User: User): Observable<number> {
    return this.httpClient.post<number>(this.usersUrl, User);
  }

  Delete(id: number): Observable<number> {
    return this.httpClient.delete<number>(this.usersUrl + id);
  }
}
