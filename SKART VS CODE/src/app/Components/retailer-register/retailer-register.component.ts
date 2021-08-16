import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordChecker } from "../../custom-validator/password-checker";
import {Router} from '@angular/router';

import {RetailerRegisterService} from "../../Services/retailer-register.service";

@Component({
  selector: 'app-retailer-register',
  templateUrl: './retailer-register.component.html',
  styleUrls: ['./retailer-register.component.css']
})
export class RetailerRegisterComponent implements OnInit {

  registerForm : FormGroup;
  status: any;
  constructor(private formBuilder : FormBuilder, private register:RetailerRegisterService, private router:Router ) { }


  phoneregex = "^((\\+91-?)|0)?[0-9]{10}$";

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      retaileremail : new FormControl('',[Validators.email, Validators.required]),
      retailername : new FormControl('',[Validators.required, Validators.minLength(5)]),
      retailerpassword : new FormControl('',[Validators.required,Validators.minLength(6)]),
      confretailerpassword : new FormControl('',[Validators.required,Validators.minLength(6)])
    },{
      validators: PasswordChecker("retailerpassword", "confretailerpassword"),
    })
  }

  get g(){
    return this.registerForm.controls;
  }

  doRegister(){
    this.status=this.register.retailerregister(this.registerForm.value.retailername,this.registerForm.value.retaileremail,this.registerForm.value.retailerpassword).subscribe(
      data=>{
        this.status=data;
        if(this.status=="Valid"){
          alert("Registeration Successful");
          this.router.navigate(['retailerlogin']);
        }else{
          alert('Email id already registered.');
        }
      },
      (err)=>
    {console.log(err.error)
      if(err.error.text==='Valid')
      {
        alert("Registeration Successful");
          this.router.navigate(['retailerlogin']);
      }
      else
      {
        alert('Email id already registered.');
      }
     }
    )

  }

  }


