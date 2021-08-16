import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotretailerService {

  url:string = "http://localhost:16926/api/email/";

  constructor(private http : HttpClient) { }
  sendOTP(email: string) : Observable<any>{
    return this.http.get<any>(this.url+"SendRetailerEmail?to="+email);
    }
  
    updateUser(retaileremail:string, retailerpassword:string):Observable<any>{
      const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
     
      return this.http.put<any>(this.url+"UpdateRetailerPassword?retaileremail="+retaileremail+"&retailerpassword="+retailerpassword,httpheader);
    }
}

