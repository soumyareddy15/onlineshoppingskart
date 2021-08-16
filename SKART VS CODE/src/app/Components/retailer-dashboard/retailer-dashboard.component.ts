import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Services/profile.service';

@Component({
  selector: 'app-retailer-dashboard',
  templateUrl: './retailer-dashboard.component.html',
  styleUrls: ['./retailer-dashboard.component.css']
})
export class RetailerDashboardComponent implements OnInit {

  retailerdetails:any=[];
  retaileremail = sessionStorage.getItem('retaileremail');

  constructor(private router : Router,private profileserv : ProfileService) { }

  ngOnInit(): void {
    document.getElementById("ret").style.display="none";
  }

  gotoProduct(){
    this.router.navigate(['productupload']);
  }
  gotoChange(){
    this.router.navigate(['changepassretailer']);
  }
  gotoDetails()
  {
    this.getretailer(this.retaileremail);
    var x=document.getElementById("ret");
    if(x.style.display==="none")
    {
      x.style.display="block";
    }
    else{
      x.style.display="none";
    } 
  }

  getretailer(retaileremail:string)
  {
    this.retailerdetails=this.profileserv.getretailerprofile(retaileremail).subscribe((data)=>{
      this.retailerdetails=data;
      console.log(data)
    });
    console.log(this.retailerdetails);
  }

}