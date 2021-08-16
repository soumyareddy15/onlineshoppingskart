import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotserviceService {
  url:string = "http://localhost:16926/api/email/";

  constructor(private http : HttpClient ) { }

  sendOTP(email: string) : Observable<any>{
  return this.http.get<any>(this.url+"SendUserEmail?to="+email);
  }

  updateUser(email:string, password:string):Observable<any>{
    const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
    console.log(email);
    console.log(password);
    return this.http.put<any>(this.url+"UpdateUserPassword?email="+email+"&password="+password,httpheader);
  }
}