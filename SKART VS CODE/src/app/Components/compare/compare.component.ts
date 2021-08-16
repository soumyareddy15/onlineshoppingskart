import { Component, OnInit } from '@angular/core';
import { OrderModal } from '../../modal/OrderModal';
import { CartdashserviceService } from '../../Services/cartdashservice.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

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
    this.status = this.usercartserv.getCompare(this.useremail).subscribe(
      data => {
        this.usercart = data;
      }
    )
  }
  
  removefromcompare(compareid:number){
    this.remove = this.usercartserv.removeCompare(compareid).subscribe(
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
            alert('Item removed from compare list');
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
          alert('Item removed from compare list');
          
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