import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  url:string = "http://localhost:16926/api/admin/";
  constructor(private http : HttpClient) { }

  getRetailers(){
    return this.http.get(this.url+"admin-dashboard");
  }

  sendApproval(retailerid : number, retaileremail : string):Observable<any>{
    const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
    return this.http.put<any>(this.url+"approve-retailer?retailerid="+retailerid+"&retaileremail="+retaileremail,httpheader);
  }

  sendemail(retaileremail: string) : Observable<any>{
    return this.http.get<any>(this.url+"send-email?retaileremail="+retaileremail);
  }
}
