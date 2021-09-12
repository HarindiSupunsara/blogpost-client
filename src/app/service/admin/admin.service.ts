import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MAIN_URL } from 'src/app/util/app-constant';

const SUB_URL= "admin";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllAdminUsers(): Observable<any> {
    const headers = new HttpHeaders().set("authorization", sessionStorage.getItem("token")!).set('access-control-allow-origin',MAIN_URL);
    return this.http.get<any>(MAIN_URL + SUB_URL, {headers});
  }

  getCount(): Observable<any> {
    const headers = new HttpHeaders().set("authorization", sessionStorage.getItem("token")!).set('access-control-allow-origin',MAIN_URL);
    return this.http.get<any>(MAIN_URL + SUB_URL + "/get-count", {headers});
  }

  changeStatus(id:number,status:string): Observable<any> {
    const headers = new HttpHeaders().set("authorization", sessionStorage.getItem("token")!).set('access-control-allow-origin',MAIN_URL);
    return this.http.get<any>(MAIN_URL + SUB_URL +"/change-status/" + id + "/" + status, {headers});
  }

  saveAdmin(admin:any): Observable<any> {
    console.log(admin)
    const headers = new HttpHeaders().set("authorization", sessionStorage.getItem("token")!).set('access-control-allow-origin',MAIN_URL);
    return this.http.post<any>(MAIN_URL + SUB_URL, admin, {headers});
  }

  getAdmin(id:number): Observable<any> {
    const headers = new HttpHeaders().set("authorization", sessionStorage.getItem("token")!).set('access-control-allow-origin',MAIN_URL);
    return this.http.get<any>(MAIN_URL + SUB_URL + "/" + id, {headers});
  }

}
