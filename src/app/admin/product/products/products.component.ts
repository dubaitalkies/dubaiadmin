import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  user:any;products:any=[];produc:any=[]
  classes:any=[];
  nodata:String="";
  loging:any=true;
  loader:any=false;
  imgUrl:any;type:any;
  project:any = localStorage.getItem("project");
  constructor(private orgnigation:OrgnigationService,private activatedroute: ActivatedRoute,private router: Router) {
    this.imgUrl = environment.imgUrl;
    var use = localStorage.getItem("admin");
    if(use != null){
      this.user = JSON.parse(use);
      this.fetchData();
    }

    this.activatedroute.params.subscribe((data:any) => {
      this.type=data.type;
    });
   }

   ngOnInit(): void {

  }

  change(event:any){
    this.produc = [];
    var val = event.target.value;
    if(val=="All Category"){
      this.produc = this.products;
    }
    else{
      for(let i in this.products){
        if(this.products[i].categories.toLowerCase().includes(val.toLowerCase())){
          this.produc.push(this.products[i]);
        }
      }
    }

    if(this.produc.length == 0){
      this.nodata="No any product present at this time.";
    }
    else{this.nodata="";}
  }

  fetchData(){
    this.products=[];this.produc=[];this.loging=true;this.nodata="";
    let resp = this.orgnigation.getProductByVendore(this.user.id,this.project);
    resp.subscribe(
      (Response:any)=>{
        if(this.type==null){
          this.products=Response;
        }
        else{
          for(var i in Response){
            if(this.type == "active"){
              if(Response[i].status == "1"){
                this.products.push(Response[i]);
              }
            }
            else{
              if(Response[i].status == "0"){
                this.products.push(Response[i]);
              }
            }
          }
        }
        if(this.products.length>0){this.nodata="";this.loging=false;this.produc = this.products;}
        else{this.nodata="No any product present at this time.";this.products=[];this.loging=false;}
      },
      error=>{this.nodata="No any product present at this time.";this.products=[];this.loging=false;})
  }
  
  delete(idd:any){
    if (confirm('Are you sure you want to delete')){
      this.orgnigation.deleteProduct(idd).subscribe(()=> {
        this.fetchData();
      });
    }
  }

  upprod(pos:any){
    var prod = this.produc[pos];
    localStorage.setItem("product",JSON.stringify(prod));
    this.router.navigate(['/add-products/update']);
  }
}
