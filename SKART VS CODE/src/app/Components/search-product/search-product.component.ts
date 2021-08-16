import { Component, OnInit } from '@angular/core';
import { SearchProductService } from '../../Services/search-product.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ProdModal} from '../../modal/ProdModal'
import {AddToCartService} from '../../Services/add-to-cart.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  showModal : boolean = false;
  prod : ProdModal = new ProdModal();
  status : any;
  useremail = sessionStorage.getItem('useremail');
  searchForm: FormGroup;
  count:number=0;

  searchdetails: any = [];
  constructor(private router:Router,private searchservice: SearchProductService,private formbuilder:FormBuilder,private addtocartserv : AddToCartService) { }

  ngOnInit(): void {
    this.searchForm = this.formbuilder.group({
      search : new FormControl('')
     
    })
  }

  
  fetchsearch(){
    console.log("done");
    this.searchdetails=[];
    this.searchdetails=this.searchservice.searchProduct(this.searchForm.value.search).subscribe((data)=>
    {this.searchdetails=data;console.log(data)})
    console.log(this.searchdetails);
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
            alert("Product successfully added");
          }
        }
      )
    }else{
      alert("Please login to buy products");
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

