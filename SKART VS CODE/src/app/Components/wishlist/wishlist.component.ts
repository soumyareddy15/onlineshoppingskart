import { Component, OnInit } from '@angular/core';
import { OrderModal } from '../../modal/OrderModal';
import { AddToCartService } from '../../Services/add-to-cart.service';
import { CartdashserviceService } from '../../Services/cartdashservice.service';
import { ProdModal } from '../../modal/ProdModal';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  useremail = sessionStorage.getItem('useremail');
  status : any;
  remove: any;
  subtot : any;
  buystatus : any;
  prod : ProdModal = new ProdModal();
  usercart : any = []
  subtotal : any = []
  ordermodal : OrderModal = new OrderModal();
  afterorder : boolean = false; 

  constructor(private usercartserv : CartdashserviceService,private addtocartserv : AddToCartService ) { }

  ngOnInit() {
    this.get();
    
  }

  get()
  {
    this.status = this.usercartserv.getWishlist(this.useremail).subscribe(
      data => {
        this.usercart = data;
      }
    )
  }
  
  addtocart(productid:number,quantity : number=1, wishid:number){
    console.log(quantity);
    if(this.useremail != null){
      this.status = this.addtocartserv.insertIntoCart(this.useremail, productid,quantity).subscribe(
        (data) => {
          if(data == "Success"){
            
            alert("Product successfully added to cart");
          }
        },
        (err)=>
    {console.log(err.error)
      if(err.error.text==='Success')
      {
        
        alert("Product successfully added to cart");
        this.removefromWishlist(wishid)
        
      }
     }
      )
    }else{
      alert("Please login to buy products");
    }
  }
  
  removefromWishlist(wishid:number){
    this.remove = this.usercartserv.removeWishlist(wishid).subscribe(
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
            alert('Item removed from wish list');
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
          alert('Item removed from wish list');
          
        }
      }
     
     }
      
       
    );
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