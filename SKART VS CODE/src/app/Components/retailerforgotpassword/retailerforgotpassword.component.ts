import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordChecker } from '../../custom-validator/password-checker';
import {Router} from '@angular/router';
import { ForgotretailerService } from '../../Services/forgotretailer.service';

@Component({
  selector: 'app-retailerforgotpassword',
  templateUrl: './retailerforgotpassword.component.html',
  styleUrls: ['./retailerforgotpassword.component.css']
})
export class RetailerforgotpasswordComponent implements OnInit {

  forgetPasswordOTPForm : FormGroup
  otpstatus : boolean = false;
  buttonname : any ='Get OTP';

  userotp : any;
  checkotp : number;

  otppattern : string = "^[0-9]{4}";

  constructor(private formBuilder : FormBuilder,private router : Router, private forgotretail:ForgotretailerService ) { }

  ngOnInit(): void {
    this.forgetPasswordOTPForm = this.formBuilder.group({
      useremail : new FormControl('',[Validators.required, Validators.email]),
      otp : new FormControl('',[Validators.required,Validators.pattern(this.otppattern)]),
      newpassword : new FormControl('',[Validators.required,Validators.minLength(6)]),
      confirmnewpassword : new FormControl('',[Validators.required,Validators.minLength(6)])
    },{
      validators: PasswordChecker("newpassword", "confirmnewpassword"),
    })
  }
  get l(){
    return this.forgetPasswordOTPForm.controls;
  }
  doChange(){
    if(this.checkotp == this.forgetPasswordOTPForm.value.otp && this.forgetPasswordOTPForm.valid){
      this.forgotretail.updateUser(this.forgetPasswordOTPForm.value.useremail,this.forgetPasswordOTPForm.value.newpassword).subscribe(
        data => { 
          if(data == "Valid"){
            alert("Password changed successfully");
            this.router.navigate(['retailerlogin'])
          }
         },
         (err)=>
    {console.log(err.error)
      if(err.error.text==='Valid')
      {
        alert("Password changed successfully");
            this.router.navigate(['retailerlogin'])
      }
     
     }
      )
      this.forgetPasswordOTPForm.reset();
    }
    if(this.checkotp != this.forgetPasswordOTPForm.value.otp && this.forgetPasswordOTPForm.valid){
      alert("Invalid OTP. Please enter correct OTP");
    }
  }

  getOtp(){
    this.otpstatus = !this.otpstatus
    this.forgotretail.sendOTP(this.forgetPasswordOTPForm.value.useremail).subscribe(
      data => {
        console.log(data);
        if(data == 0){
          alert('Please enter correct email id');
          this.buttonname = 'Get OTP';
          this.otpstatus = !this.otpstatus
          this.forgetPasswordOTPForm.reset();
        }else{
          alert("Please check your email for OTP");
          this.buttonname = 'Put OTP';
          this.checkotp = data;
        }
      }
    );
  }

}