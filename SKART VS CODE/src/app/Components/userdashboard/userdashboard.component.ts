import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../Services/profile.service';
@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  userdetails:any=[];
  users : any= [];
  status : any;
  useremail = sessionStorage.getItem('useremail');
  constructor(private router:Router,private profileserv : ProfileService) { }

  ngOnInit(): void {
    this.getprofileuser(this.useremail);
    this.getuser(this.useremail);
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
      {console.log(err.error)
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
