import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(sessionStorage.getItem('useremail'))
    {
      return true;
    }
    else if(sessionStorage.getItem('retaileremail'))
     {
      //this.router.navigate(['home'])
      return true;
    }
    else 
     {
      this.router.navigate(['home'])
      return false;
    }
    
  }
 
}
