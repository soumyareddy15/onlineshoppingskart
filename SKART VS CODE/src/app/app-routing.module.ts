import { componentFactoryName } from '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { AdminloginComponent } from './Components/adminlogin/adminlogin.component';
import { CartDashboardComponent } from './Components/cart-dashboard/cart-dashboard.component';
import { ChangepwdretailerComponent } from './Components/changepwdretailer/changepwdretailer.component';
import {SearchProductComponent} from './Components/search-product/search-product.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductUploadComponent } from './Components/product-upload/product-upload.component';
import { RetailerDashboardComponent } from './Components/retailer-dashboard/retailer-dashboard.component';
import { RetailerLoginComponent } from './Components/retailer-login/retailer-login.component';
import { RetailerRegisterComponent } from './Components/retailer-register/retailer-register.component';
import { UserRegisterComponent } from './Components/user-register/user-register.component';
import { UserloginComponent } from './Components/userlogin/userlogin.component';
import { CartdashserviceService } from './Services/cartdashservice.service';
import { ForgotserviceService } from './Services/forgotservice.service';
import{FilterByPriceComponent} from './Components/filter-by-price/filter-by-price.component';
import {UserprofileComponent} from './Components/userprofile/userprofile.component';
import {UserchangepasswordComponent} from './Components/userchangepassword/userchangepassword.component';
import {RetailerforgotpasswordComponent} from './Components/retailerforgotpassword/retailerforgotpassword.component';
import { CompareComponent } from './Components/compare/compare.component';
import { UserdashboardComponent } from './Components/userdashboard/userdashboard.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { AuthguardService } from './authguard.service';

const routes: Routes = [
  {path:"",redirectTo:"home", pathMatch:'full'},
 
  {path:"home",component:HomeComponent},
  {path:"adminlogin",component:AdminloginComponent},
  {path:"admindashboard",component:AdminDashboardComponent},
  {path:"retailerlogin",component:RetailerLoginComponent},
  {path:"retailerregister",component:RetailerRegisterComponent},
  {path:"productupload",component:ProductUploadComponent},
  {path:"userlogin",component:UserloginComponent},
  {path:"userregister",component:UserRegisterComponent},
  {path:"forgotpassword",component:ForgotPasswordComponent},
  {path:"cartdashboard",component:CartDashboardComponent,canActivate:[AuthguardService]},
  {path:"retailerdashboard",component:RetailerDashboardComponent,canActivate:[AuthguardService]},
  {path:"changepassretailer",component:ChangepwdretailerComponent},
  {path:"searchproduct",component:SearchProductComponent},
  {path:"filterbyprice",component:FilterByPriceComponent},
  {path:"userprofile",component:UserprofileComponent},
  {path:"changepassuser",component:UserchangepasswordComponent},
  {path:"forgotpasswordretailer",component:RetailerforgotpasswordComponent},
  {path:"compare",component:CompareComponent,canActivate:[AuthguardService]},
  {path:"wishlist",component:WishlistComponent,canActivate:[AuthguardService]},
  {path:"orders",component:UserdashboardComponent,canActivate:[AuthguardService]},
  {path:'**',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
