import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadProductsService } from '../../Services/upload-products.service';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {
  imageUrl: string = "./assets/upload.png";
  
  fileToUpload: File = null;
  status:any;
  retaileremail : string = sessionStorage.getItem('retaileremail');
  retailerid : any;
 
  constructor(private imageService : UploadProductsService, private router : Router) { }

  ngOnInit() {
    this.status = this.imageService.getRetailerId(this.retaileremail).subscribe(
      data =>{
        if(data !="Invalid"){
         
          this.retailerid = data;
          console.log(data);
          
        }
      }
    )
  }

 
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
   
  OnSubmit(Retailerid,Productname,Productquantity,Productprice,Productdescription,Productbrand,Categoryid,Image){
    
   this.imageService.UploadImage(Retailerid.value,Productname.value,Productquantity.value,Productprice.value,Productdescription.value,Productbrand.value,Categoryid.value,Image.value).subscribe(
     data =>{
       console.log('success');
       Productname.value = null;
       Productquantity.value=null;
       Productdescription.value = null;
       Productprice.value=null;
       Categoryid.value=null;
     
       Image.value = null;
      
       this.imageUrl = "./assets/upload.png";
      
     }
   );
   alert('Product uploaded');
   this.router.navigate(['retailerdashboard']);
  }

}

