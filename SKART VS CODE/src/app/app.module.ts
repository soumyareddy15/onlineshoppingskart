import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import {RouterModule} from '@angular/router';
import { AdminloginComponent } from './Components/adminlogin/adminlogin.component';
import {FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component'
import {AdminserviceService} from './Services/adminservice.service'
import { HttpClientModule} from '@angular/common/http';
import { RetailerLoginComponent } from './Components/retailer-login/retailer-login.component';
import { RetailerRegisterComponent } from './Components/retailer-register/retailer-register.component';
import {RetailerloginService} from './Services/retailerlogin.service';
import {RetailerRegisterService} from './Services/retailer-register.service';
import { ProductUploadComponent } from './Components/product-upload/product-upload.component';
import { UploadProductsService} from './Services/upload-products.service';
import {ProductlistService} from './Services/productlist.service';
import { UserloginComponent } from './Components/userlogin/userlogin.component';
import { UserRegisterComponent } from './Components/user-register/user-register.component'
import {LoginService} from './Services/login.service'
import {UserRegisterService} from './Services/user-register.service';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component'
import {ForgotserviceService} from './Services/forgotservice.service'
import {AddToCartService} from './Services/add-to-cart.service';
import { CartDashboardComponent } from './Components/cart-dashboard/cart-dashboard.component'
import {CartdashserviceService} from './Services/cartdashservice.service';
import { RetailerDashboardComponent } from './Components/retailer-dashboard/retailer-dashboard.component';
import { ChangepwdretailerComponent } from './Components/changepwdretailer/changepwdretailer.component'
import { ChangepasswordService } from './Services/changepassword.service';
import { ProfileService } from './Services/profile.service';
import { FilterService } from './Services/filter.service';
import { FilterByPriceComponent } from './Components/filter-by-price/filter-by-price.component';
import {SearchProductService} from './Services/search-product.service';
import { SearchProductComponent } from './Components/search-product/search-product.component';
import { UserprofileComponent } from './Components/userprofile/userprofile.component';
import { UserchangepasswordComponent } from './Components/userchangepassword/userchangepassword.component';
import { RetailerforgotpasswordComponent } from './Components/retailerforgotpassword/retailerforgotpassword.component';
import { ForgotretailerService} from './Services/forgotretailer.service';
import { CompareComponent } from './Components/compare/compare.component';
import { UserdashboardComponent } from './Components/userdashboard/userdashboard.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { AuthguardService } from './authguard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminloginComponent,
    AdminDashboardComponent,
    RetailerLoginComponent,
    RetailerRegisterComponent,
    ProductUploadComponent,
    UserloginComponent,
    UserRegisterComponent,
    ForgotPasswordComponent,
    CartDashboardComponent,
    RetailerDashboardComponent,
    ChangepwdretailerComponent,
    FilterByPriceComponent,
    SearchProductComponent,
    UserprofileComponent,
    UserchangepasswordComponent,
    RetailerforgotpasswordComponent,
    CompareComponent,
    UserdashboardComponent,
    NotfoundComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AdminserviceService,RetailerloginService,RetailerRegisterService, UploadProductsService,ProductlistService,
    LoginService,UserRegisterService,ForgotserviceService,AddToCartService,CartdashserviceService,AuthguardService,
    ChangepasswordService,ProfileService,FilterService,SearchProductService,ForgotretailerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
