import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Role } from '../models/role';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    loginUrl = environment.apiUrl + '/login';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get isLoggedIn(): boolean {
        return this.currentUserSubject.value ? true : false;
    }

    public get isAdmin(): boolean {
        return this.currentUserSubject.value.role === Role.Admin;
    }

    public get isActive(): boolean {
        return this.currentUserSubject.value.isActive;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.loginUrl}/authenticate`, { username, password })
            .pipe(map(user => {
                if (!user) {
                    console.log('Login error');
                    return;
                }

                // Base 64 encoding
                user.authdata = window.btoa(username + ':' + password);
                
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
