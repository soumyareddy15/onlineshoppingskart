import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordChecker } from '../../custom-validator/password-checker';
import { ForgotserviceService } from '../../Services/forgotservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgetPasswordOTPForm : FormGroup
  otpstatus : boolean = false;
  buttonname : any ='Get OTP';

  userotp : any;
  checkotp : number;

  //otppattern : string = "\d{4}";
  otppattern : string = "^[0-9]{4}";
  constructor(private formBuilder : FormBuilder, private forgotserv : ForgotserviceService,private router:Router) { }

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
      this.forgotserv.updateUser(this.forgetPasswordOTPForm.value.useremail,this.forgetPasswordOTPForm.value.newpassword).subscribe(
        data => { 
          if(data == "Valid"){
            alert("Password changed successfully");
            this.router.navigate(['userlogin'])
          }
         },
         (err)=>
    {console.log(err.error)
      if(err.error.text==='Valid')
      {
            alert("Password changed successfully");
            this.router.navigate(['userlogin'])
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
    this.forgotserv.sendOTP(this.forgetPasswordOTPForm.value.useremail).subscribe(
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
      },
      (err)=>
    {console.log(err.error)
      if(err.error.text===0)
      {
        alert('Please enter correct email id');
        this.buttonname = 'Get OTP';
        this.otpstatus = !this.otpstatus
        this.forgetPasswordOTPForm.reset();
      }else{
        alert("Please check your email for OTP");
        this.buttonname = 'Put OTP';
        this.checkotp = err;
      }
     
     }
    );
    }
  }