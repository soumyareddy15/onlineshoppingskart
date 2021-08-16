import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangepasswordService } from 'src/app/Services/changepassword.service';
import { PasswordChecker } from "../../custom-validator/password-checker";


@Component({
  selector: 'app-changepwdretailer',
  templateUrl: './changepwdretailer.component.html',
  styleUrls: ['./changepwdretailer.component.css']
})
export class ChangepwdretailerComponent implements OnInit {

  forgotPasswordForm : FormGroup;
  status : any;
  constructor(private formBuidler : FormBuilder, private changepd : ChangepasswordService, private router:Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuidler.group({
      useremail : new FormControl('',[Validators.required, Validators.email]),
      oldpassword : new FormControl('',[Validators.required,Validators.minLength(6)]),
      newpassword : new FormControl('',[Validators.required,Validators.minLength(6)]),
      confirmnewpassword : new FormControl('',[Validators.required,Validators.minLength(6)])
    },{
      validators: PasswordChecker("newpassword", "confirmnewpassword"),
    });
  }

  get k(){
    return this.forgotPasswordForm.controls;
  }

  doChangePassword(){
    this.status = this.changepd.changeRetailer(this.forgotPasswordForm.value.useremail,
      this.forgotPasswordForm.value.oldpassword, this.forgotPasswordForm.value.newpassword).subscribe(
        data => {
          if(data == "valid"){
            alert('Password changed successfully');
            this.router.navigate(['retailerlogin']);
          }else{
            alert('Please enter correct details');
          }
        },
        (err)=>
    {console.log(err.error)
      
      alert('Password changed successfully');
      this.router.navigate(['retailerlogin']);
     
     }
      )
  }
  
}
