import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadProductsService {
  constructor(private http : HttpClient) { }

  url:string = "http://localhost:16926/api/retailer/";
  url1:string = "http://localhost:16926/api/ProductUpload/"

  getRetailerId(retaileremail:string):Observable<any>{
    return this.http.get(this.url+"GetRetailersId?retaileremail="+retaileremail);
  }
  UploadImage(retailerid:string,productname: string,productquantity:string,productprice: string,productdescription: string,productbrand: string,categoryid:string,Image:string):Observable<any>{
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.http.post<any>(this.url1+"UploadImage?&retailerid="+retailerid+"&productname"+
        productname+"&productquantity="+productquantity+"&productprice="+productprice+"&productdescription="+
        productdescription+"&productbrand="+productbrand+"&categoryid="+categoryid+"&Image="+Image, httpheader);
}

}