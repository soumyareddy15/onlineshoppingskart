import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Services/profile.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  userdetails:any=[];
  users : any= [];
  status : any;
  useremail = sessionStorage.getItem('useremail');
  constructor(private router:Router,private profileserv : ProfileService) { }

  ngOnInit(): void {
    this.getprofileuser(this.useremail);
    this.getuser(this.useremail)
  }
  getuser(useremail:string)
  {
    this.userdetails=this.profileserv.getuserprofile(useremail).subscribe((data)=>{
      this.userdetails=data;
      console.log(data)
    });
    console.log(this.userdetails);
  }
  getprofileuser(useremail : string){
    this.status = this.profileserv.getprofile(useremail).subscribe(
      (data)=>{
        this.users = data;
      },
      (err)=>
      {
        debugger;
        console.log(err.error)
        this.users = err;
      }

      
    )
    
  }
  UserPassChange(){
    this.router.navigate(['changepassuser']);
  }
  gotoHome(){
    this.router.navigate(['home']);
  }

}
