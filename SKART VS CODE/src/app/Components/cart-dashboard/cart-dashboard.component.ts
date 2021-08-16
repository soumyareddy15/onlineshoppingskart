import { Component, OnInit } from '@angular/core';
import {CartdashserviceService} from '../../Services/cartdashservice.service'
import {OrderModal } from '../../modal/OrderModal';

@Component({
  selector: 'app-cart-dashboard',
  templateUrl: './cart-dashboard.component.html',
  styleUrls: ['./cart-dashboard.component.css']
})
export class CartDashboardComponent implements OnInit {

  useremail = sessionStorage.getItem('useremail');
  status : any;
  remove: any;
  subtot : any;
  buystatus : any;
  usercart : any = []
  subtotal : any = []
  ordermodal : OrderModal = new OrderModal();
  afterorder : boolean = false; 

  constructor(private usercartserv : CartdashserviceService ) { }

  ngOnInit() {
    this.get();
    

  }
  get()
  {
    this.status = this.usercartserv.getCart(this.useremail).subscribe(
      data => {
        this.usercart = data;
      }
    )
    this.getSubtotal(this.useremail);

  }
  
  removefromcart(cartid:number,productid : number){
    this.remove = this.usercartserv.removeProduct(cartid, productid).subscribe(
      data =>
      {
        if(data == "Success")
        {
          if(this.afterorder){
            this.get();
            alert('Order placed Successfully');
          }else
          {
            this.get();
            alert('Item removed from cart');
          }
        }
      },
      (err)=>
    {console.log(err.error)
      if(err.error.text==='Success')
      {
        if(this.afterorder){
          this.get();
          alert('Order placed Successfully');
        }else
        {
          this.get();
          alert('Item removed from cart');
          
        }
      }
     
     }
      
       
    );
  }

  getSubtotal(useremail){
    this.subtot = this.usercartserv.getSubtotal(useremail).subscribe(
      data =>{
        this.subtotal = data;
      }
    )
  }
  buyproduct(productid:number, retailerid:number, quantity : number, cartid : number){
    console.log("here")
    this.buystatus = this.usercartserv.purchaseProduct(this.useremail, productid, retailerid, quantity).subscribe(
      data => {
        if(data == "Success"){
          this.afterorder = true;
          this.removefromcart(cartid,productid);
        }
        else
        {
          alert("Could not place Order")
        }
      },
      (err)=>
    {console.log(err.error)
      if(err.error.text==='Success')
      {
        this.afterorder = true;
          this.removefromcart(cartid,productid);
          
      }
      else
      {
        alert("Could not place Order")
      }
     
     }

    )
  }
  openModal(productid:number,cartid:number,productprice:number,retailerid:number,productname:string, total: number, quantity : number){
    this.ordermodal.productid = productid;
    this.ordermodal.cartid = cartid;
    this.ordermodal.productprice = productprice;
    this.ordermodal.retailerid =retailerid;
    this.ordermodal.productname = productname;
    this.ordermodal.total = productprice * quantity;
    this.ordermodal.orderquantity = quantity;
  }
}