import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {LoginService}  from '../../Services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  loginForm : FormGroup;
  status : any;
  
  constructor(private formBuilder : FormBuilder, private loginserv : LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      useremail : new FormControl('',[Validators.email, Validators.required]),
      userpassword : new FormControl('',[Validators.required, Validators.minLength(6)])
    })

  }

  get h(){
    return this.loginForm.controls;
  }

  doLogin(){
    this.loginserv.doLogin(this.loginForm.value.useremail, this.loginForm.value.userpassword).subscribe(
       (data)=> {
         console.log(data);
         
       },
       (err)=>
       {console.log(err.error)
         if(err.error.text==='Success')
         {
           sessionStorage.setItem('useremail',this.loginForm.value.useremail);
           sessionStorage.setItem('username',this.loginForm.value.username);
           alert('Login Sucessful')
           this.router.navigate(['home']);
           
           
           
         }
         else
         {
           alert("Invalid Credentials !");
         }
        
       }
       
 
     )
      }
    }
