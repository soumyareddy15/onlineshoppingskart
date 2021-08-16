import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetailerRegisterService {
  url:string = "http://localhost:16926/api/retailer/";
  constructor(private http : HttpClient) { }

  retailerregister(retailername:string,retaileremail:string,retailerpassword:string): Observable<any>{
    const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
    return this.http.post<any>(this.url+"retailer-register?retailername=" + retailername + "&retaileremail="+retaileremail+"&retailerpassword="+retailerpassword,httpheader);
   
  }
}
