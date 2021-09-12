import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MAIN_URL } from 'src/app/util/app-constant';

const SUB_URL= "post";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogsToApprove(status:any): Observable<any> {
    const headers = new HttpHeaders().set("authorization", sessionStorage.getItem("token")!).set('access-control-allow-origin',MAIN_URL);
    return this.http.get<any>(MAIN_URL + SUB_URL + "/approved/"+status, {headers});
  }

  approveBlog(id:any,status:any): Observable<any> {
    const headers = new HttpHeaders().set("authorization", sessionStorage.getItem("token")!).set('access-control-allow-origin',MAIN_URL);
    return this.http.get<any>(MAIN_URL + SUB_URL + "/approve-status/"+id +"/"+ sessionStorage.getItem("id") +"/"+status, {headers});
  }

  myBlogs(): Observable<any> {
    const headers = new HttpHeaders().set("authorization", sessionStorage.getItem("token")!).set('access-control-allow-origin',MAIN_URL);
    return this.http.get<any>(MAIN_URL + SUB_URL + "/user/"+sessionStorage.getItem("id"), {headers});
  }

  saveBlog(obj:any): Observable<any> {
    const headers = new HttpHeaders().set("authorization", sessionStorage.getItem("token")!).set('access-control-allow-origin',MAIN_URL);
    return this.http.post<any>(MAIN_URL + SUB_URL ,obj, {headers});
  }

  changeStatus(id:number,status:string): Observable<any> {
    const headers = new HttpHeaders().set("authorization", sessionStorage.getItem("token")!).set('access-control-allow-origin',MAIN_URL);
    return this.http.get<any>(MAIN_URL + SUB_URL +"/change-status/" + id + "/" + status, {headers});
  }

  getPost(id:number): Observable<any> {
    const headers = new HttpHeaders().set("authorization", sessionStorage.getItem("token")!).set('access-control-allow-origin',MAIN_URL);
    return this.http.get<any>(MAIN_URL + SUB_URL + "/" + id, {headers});
  }

  getAllCategory(): Observable<any> {
    const headers = new HttpHeaders().set("authorization", sessionStorage.getItem("token")!).set('access-control-allow-origin',MAIN_URL);
    return this.http.get<any>(MAIN_URL + "category" , {headers});
  }

}
