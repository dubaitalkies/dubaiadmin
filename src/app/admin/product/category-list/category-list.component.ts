import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef|any;
  loging:any=true;
  category:any=[]
  nodata:String="";cid:any;
  uprod:any={};
  project:any = localStorage.getItem("project");
  preload:any=false;

  constructor(private orgnigation:OrgnigationService,private router: Router) { 
    this.fetchData();
  }

  ngOnInit(): void {
  }
  fetchData(){
    this.category=[];this.loging=true;this.nodata="";
    let resp = this.orgnigation.getCategory(this.project);
    resp.subscribe(
      (Response:any)=>{
        this.category=Response;
        this.loging=false;this.nodata="";
      },
      error=>{this.nodata="No any category present at this time.";this.category=[];this.loging=false;})
  }

  updateCrs(pos:any){
    var categ = this.category[pos];
    if(categ.status){categ.status=1;}else{categ.status=0;}
    this.orgnigation.saveCategory(categ).subscribe();
  }

  delete(idd:any){
    if (confirm('Are you sure you want to delete')){
      this.orgnigation.deleteCategory(idd).subscribe(()=> {
        this.fetchData();
      });
    }
  }

  upprod(pos:any){
    var prod = this.category[pos];
    localStorage.setItem("category",JSON.stringify(prod));
    this.router.navigate(['/category/update']);
  }

  job:any=new FormGroup({
    title:new FormControl("",[Validators.required]),
    slug:new FormControl("",[Validators.required]),
    description:new FormControl(""),
    img:new FormControl(""),
    status:new FormControl(1),
    pid:new FormControl(""),
    minamount:new FormControl(""),
    project:new FormControl(this.project),
    pagetitle:new FormControl(""),
    keyword:new FormControl(""),
    discription:new FormControl("")
  });
  onKey(event:any){
    var values = event.target.value;
    this.uprod.slug = this.orgnigation.replaceUrl(values);
  }
  view(pos:any){
    this.cid = this.category[pos].id;
  }
  saveproduct(){
    if(this.preload!=true){
      if (this.job.invalid) {
        var invalidFields:any = [].slice.call(document.getElementsByClassName('ng-invalid'));
        invalidFields[1].focus(); 
        this.job.get('title').markAsTouched();
        this.job.get('slug').markAsTouched();
      }
      else{
        this.preload = true;
        this.job.value.pid = this.cid;
        this.uprod = this.job.value;
  
        this.orgnigation.saveCategory(this.uprod).subscribe(
          Response=>{
            this.closeAddExpenseModal.nativeElement.click();
            this.preload = false;
            this.fetchData();
            //this.job.reset();
          }
        );
      }
    }
  }

}
