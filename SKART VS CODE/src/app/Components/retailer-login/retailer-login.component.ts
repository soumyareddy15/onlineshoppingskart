import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import {RetailerloginService} from '../../Services/retailerlogin.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-retailer-login',
  templateUrl: './retailer-login.component.html',
  styleUrls: ['./retailer-login.component.css']
})
export class RetailerLoginComponent implements OnInit {

  loginForm : FormGroup;
  retaileremail:string;
  retailerpassword:string;
  status:any;
  message:any;

  constructor(private formBuilder:FormBuilder, private retailserv : RetailerloginService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      retaileremail : new FormControl('',[Validators.email, Validators.required]),
      retailerpassword : new FormControl('',[Validators.required, Validators.minLength(6)])
    })
    sessionStorage.clear();
  }

  get h(){
    return this.loginForm.controls;
  }

  doLogin(){
      this.status = this.retailserv.checkLogin(this.loginForm.value.retaileremail,
        this.loginForm.value.retailerpassword).subscribe(
          (data)=> {
       
  
    console.log(data);
    if(data=="Valid"){
      console.log(this.loginForm.value.retaileremail);
      sessionStorage.setItem('retaileremail',this.loginForm.value.retaileremail);
      this.router.navigate(['retailerdashboard']);
  }else{
    alert('Invalid credentials or Retailer not approved');
  }
  },
  (err)=>
  {console.log(err.error)
    if(err.error.text==='Valid')
    {
      console.log(this.loginForm.value.retaileremail);
              sessionStorage.setItem('retaileremail',this.loginForm.value.retaileremail);
              this.router.navigate(['retailerdashboard']);
          }else{
            alert('Invalid credentials or Retailer not approved');
          }
  }


)
 }
}
