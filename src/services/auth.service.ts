import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiurl = 'http://localhost:5000';
  private loginStatus = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient) { }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiurl}/signup`, { username, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiurl}/login`, { email, password })
  }

  getLoginStatus() {
    return this.loginStatus.asObservable();
  }

  setLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }

  logout() {
    if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    this.loginStatus.next(false);
    }
  }

  isLoggedIn(): any {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('authToken');
    }

  }


}
