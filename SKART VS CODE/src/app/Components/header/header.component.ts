import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  
  constructor(private router : Router) { }
  useremail : string;
  retaileremail : string;
  adminemail : string;
  name : string;
  adminl
  
  retailerlogged:boolean=false;
  adminlogged:boolean=false;
  userlogged : boolean = false;
  orders:boolean=false;
  userprofile : boolean = false;
  retailerprofile : boolean = false;

  ngOnInit(): void {
    this.useremail = sessionStorage.getItem('useremail');
    this.retaileremail = sessionStorage.getItem('retaileremail');
    this.adminemail  = sessionStorage.getItem('adminlogin');
    if(this.useremail != null ){
      this.name = this.useremail;
      this.userlogged = true;
      this.userprofile = true;
    }
    else if(this.adminemail != null){
      this.name = this.adminemail;
      this.userlogged = true;
      this.adminlogged=true;
    }else if(this.retaileremail != null){
      this.name = this.retaileremail;
      this.userlogged = true;
      this.retailerlogged=true;
    }

  }
  admindash()
  {
    this.router.navigate(['admindashboard']);
  }
  retailerdash()
  {
    this.router.navigate(['retailerdashboard']);
  }
  
  userprofilebut(){
    this.router.navigate(['userprofile']);
  }
  userorders(){
    this.router.navigate(['orders']);
  }
  logoff(){
    this.userlogged = false;
    this.userprofile = false;
    alert("Successfully logged off");
    sessionStorage.clear();
    this.router.navigate(['home'])
  }
}
