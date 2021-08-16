import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CartdashserviceService {

  url:string = "http://localhost:16926/api/productupload/";
  constructor(private http :HttpClient) { }

  getCart(useremail:string):Observable<any>{
    return this.http.get<any>(this.url+"GetUserCart?useremail="+useremail);
  }
  getCompare(useremail:string):Observable<any>{
    return this.http.get<any>(this.url+"GetUserCompare?useremail="+useremail);
  }
  removeCompare(compareid : number) : Observable<any>{
    return this.http.delete<any>(this.url+"RemoveFromCompare?compareid="+compareid);
  }
  getWishlist(useremail:string):Observable<any>{
    return this.http.get<any>(this.url+"GetUserWishlist?useremail="+useremail);
  }
  removeWishlist(Wishid : number) : Observable<any>{
    return this.http.delete<any>(this.url+"RemoveFromWishlist?Wishid="+Wishid);
  }
  removeProduct(cartid : number, productid:number) : Observable<any>{
    return this.http.delete<any>(this.url+"RemoveFromCart?cartid="+cartid+"&productid="+productid);
  }

  getSubtotal(useremail : string):Observable<any>{
    return this.http.get<any>(this.url+"GetSubtotal?useremail="+useremail);
  }
  
  purchaseProduct(useremail : string, productid : number, retailerid:number, orderquantity :number):Observable<any>{
    console.log(useremail);
    console.log(productid);
    console.log(retailerid);
    console.log(orderquantity);
  
    const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
    return this.http.post<any>(this.url+"PurchaseProduct?useremail="+useremail+"&productid="
    +productid+"&retailerid="+retailerid+"&orderquantity="+orderquantity, httpheader);
    
  }
}