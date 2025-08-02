import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.css']
})
export class VideoAddComponent {
sucs:any;
  message:String="This Video is succesfully saved!";
  tags:any=[];user:any;type:any;
  prod:any=[{name:1,image:[],imagename:[],color:""}]
  uprod:any={categories:"",description:""};btn:any="Create Video";
  bloger:any={};
  project:any = localStorage.getItem("project");
  imgurl = localStorage.getItem("imgurl");


  constructor(public orgnigation:OrgnigationService,private activatedroute: ActivatedRoute) { 
    var ublog = localStorage.getItem("ublog");
    this.activatedroute.params.subscribe((data:any) => {
      this.type=data.url;
      if(this.type!=null){
        this.btn="Update Video";
        if(ublog!=null){
          this.bloger = JSON.parse(ublog);
        }
      }
    });

  }

  ngOnInit(): void {

  }

  blog:any=new FormGroup({
    blogTitle:new FormControl("",[Validators.required]),
    shortDescription:new FormControl(""),
    images:new FormControl("",[Validators.required]),
    description:new FormControl(""),
    categories:new FormControl("Video"),
    title:new FormControl(""),
    keyword:new FormControl(""),
    discription:new FormControl(""),
    status:new FormControl("Active"),
    url:new FormControl(""),
    userid:new FormControl("1"),
    views:new FormControl("0"),
    click:new FormControl("0"),
    date:new FormControl(formatDate(new Date(), 'yyyy-MM-dd HH:mm', 'en')),
    project:new FormControl(this.project),
  });
  


  imgess:any;
  loading:any=false;
  saveBlog(){
    if(this.imgess!=null){if(this.imgess.includes(".")){this.blog.removeControl("images");}}    
    if (this.blog.invalid) {
      var invalidFields:any = [].slice.call(document.getElementsByClassName('ng-invalid'));
      invalidFields[1].focus(); 
      this.blog.get('blogTitle').markAsTouched();
      this.blog.get('shortDescription').markAsTouched();
      this.blog.get('images').markAsTouched();
      this.blog.get('description').markAsTouched();
      this.blog.get('categories').markAsTouched();
    }
    else{
      this.loading = true;

      if(this.btn=="Update Video"){
        this.uprod = this.bloger;
      }
      else{
        this.uprod = this.blog.value;
      }

      this.uprod.url = this.orgnigation.replaceUrl(this.uprod.blogTitle.trim());
      
      this.orgnigation.saveBlog(this.uprod).subscribe(
        (Response:any)=>{
          localStorage.setItem("ublog",JSON.stringify(Response));
          this.loading = false;
          this.sucs = true;
          this.message = "Video Successfully updated!";
          window.scroll(0,0);
        },
        error=>{
          alert(JSON.stringify(error));
        }
      );
      
    }
  }


}
