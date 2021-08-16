import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  loginForm : FormGroup;
  adminemail:string;
  adminpassword:string;

  constructor(private formBuilder : FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      adminemail : new FormControl('',[Validators.email, Validators.required]),
      adminpassword : new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }
  get h(){
    return this.loginForm.controls;
  }
  doLogin(){
    console.log(this.adminemail);
    console.log(this.adminpassword);
    if(this.loginForm.value.adminemail == "admin@gmail.com" && this.loginForm.value.adminpassword =="admin@123"){
      alert("Admin login successful");
      sessionStorage.setItem('adminlogin',this.loginForm.value.adminemail);
      this.router.navigate(['admindashboard']);
    }else{
      alert("Invalid credential");
    }
  }
}