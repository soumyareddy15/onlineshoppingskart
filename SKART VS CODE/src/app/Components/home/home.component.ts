import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {OrderModal} from '../../modal/OrderModal'
import {ProdModal} from '../../modal/ProdModal'
import {AddToCartService} from '../../Services/add-to-cart.service'

import { ProductlistService } from '../../Services/productlist.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchForm : FormGroup;
  searchbar:boolean=false;
  productdetails: any=[];
  searchdetails: any=[];
  count:number=0;
  showModal : boolean = false;
  prod : ProdModal = new ProdModal();
  status : any;
  useremail = sessionStorage.getItem('useremail');
  stop : boolean = false;

  constructor(private router:Router,private productservice:ProductlistService,private formbuilder:FormBuilder,private addtocartserv : AddToCartService) { }

  ngOnInit(): void {
    if(this.searchbar==false){
      this.fetchProduct();
    }
    //this.reload();

    this.searchForm = this.formbuilder.group({
      search : new FormControl('')
     
    })
  }
  reload(){
    if(this.useremail != null && this.stop == false)
    this.stop = true;
    location.reload();
    return;
  }

  fetchProduct(){
    this. productdetails=this.productservice.getProduct().subscribe((data)=>
    {this. productdetails=data;console.log(data)})
    console.log(this. productdetails);
  }

  openModal(productid : number ,productname : string, productprice: number,productquantity : number,productdescription : string,productbrand : string ,productimage1 : string,retailerid : number,categoryid : number){
    this.prod.productid = productid;
    this.prod.productname = productname;
    this.prod.productprice = productprice;
    this.prod.productquantity = productquantity;
    this.prod.productdescription = productdescription;
    this.prod.productbrand = productbrand;
    this.prod.productimage1 = productimage1;
    this.prod.retailerid = retailerid;
    this.prod.categoryid = categoryid;
  }

  addtocart(productid:number,quantity : number){
    console.log(quantity);
    if(this.useremail != null){
      this.status = this.addtocartserv.insertIntoCart(this.useremail, productid,quantity).subscribe(
        data => {
          if(data == "Success"){
            alert("Product successfully added to cart");
          }
        },
        (err)=>
    {console.log(err.error)
      if(err.error.text==='Success')
      {
        alert("Product successfully added to cart");
           
      }
     }
      )
    }else{
      alert("Please login to buy products");
      this.router.navigate(['userlogin'])
    }
  }

  
  addtocompare(productid:number)
  {
    
    
    if((this.useremail != null) )
    
    {
      
      if(this.count<4)
      {
        this.status = this.addtocartserv.insertIntoCompare(this.useremail, productid).subscribe(
          (data) => {
            if(data == "Success"){
              
              alert("Product successfully added to compare list");
              this.count=this.count+1;
            }
          },
          (err)=>
          {console.log(err.error)
        if(err.error.text==='Success')
        {
          alert("Product successfully added to compare list");
          this.count=this.count+1;
             
        }
        
       }
        )
      }

      else
      {
        alert("Compare List is full");
      }
      

    }
    else
    {
      alert("Please login to buy products");
    }
  }
  addtowishlist(productid:number)
  {
    
    if(this.useremail != null){
      this.status = this.addtocartserv.insertIntoWishlist(this.useremail, productid).subscribe(
        data => {
          if(data == "Success"){
            alert("Product successfully added to compare list");
          }
        },
        (err)=>
    {console.log(err.error)
      if(err.error.text==='Success')
      {
        alert("Product successfully added to wish list");
           
      }
     }
      )
    }else{
      alert("Please login to buy products");
      this.router.navigate(['userlogin'])
    }
  }
}