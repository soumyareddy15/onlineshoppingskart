import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  url:string = "http://localhost:16926/api/user/";
  url1:string = "http://localhost:16926/api/retailer/";
  
  constructor(private http : HttpClient) { }
  

  changeRetailer(retaileremail : string, retailerpassword :string, newpassword : string):Observable<any>{
    const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
    return this.http.put<any>(this.url1+"ChangePassword?retaileremail="+retaileremail+
    "&retailerpassword="+retailerpassword+"&newpassword="+newpassword,httpheader);
  }

  changeUser(useremail : string, userpassword:string, newpassword:string):Observable<any>{
    const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
    return this.http.put<any>(this.url+"userchangepassword?useremail="+useremail+
    "&userpassword="+userpassword+"&newpassword="+newpassword,httpheader);
  }
  
}
