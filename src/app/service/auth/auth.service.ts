import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MAIN_URL } from 'src/app/util/app-constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password : string): Observable<any> {
    return this.http.post<any>(MAIN_URL + "auth/login", {
      "username" : username,
      "password" : password
    });
  }

  signUp(obj : any): Observable<any> {
    return this.http.post<any>(MAIN_URL + "auth/register", obj);
  }
}
