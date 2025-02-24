import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiurl = 'http://localhost:5000' ;

  constructor(private http: HttpClient) { }

  signup(username: string, email:string, password:string):Observable<any> {
    return this.http.post(`${this.apiurl}/signup`,{username,email,password});
  }

  login(email:string, password:string):Observable<any>{
    return this.http.post(`${this.apiurl}/login`,{email,password})
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiurl}/logout`);
  }

saveToken(token: string): void {
  localStorage.setItem('authToken', token);
}

  getToken():string | null {
    return localStorage.getItem('authToken');
  }


 isLoggedIn(): boolean {
  return this.getToken() !== null;
}

}
