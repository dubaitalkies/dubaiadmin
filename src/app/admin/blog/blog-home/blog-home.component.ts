import { Component, OnInit } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent implements OnInit {
  blog:any=[];loader:any=true;
  nodata:String="";
  project:any = localStorage.getItem("project");
  constructor(public orgnigation:OrgnigationService) { 
    this.loadBlog();
  }

  ngOnInit(): void {

  }

  updateCrs(pos:any){
    var blg = this.blog[pos];
    if(blg.sts){blg.status="Active";}else{blg.status="Inactive";}
    this.orgnigation.saveBlog(blg).subscribe();
  }
  loadBlog(){
    this.loader =true;this.blog=[];this.nodata = "";
    this.orgnigation.getBlogs(this.project).subscribe(
      (Response:any)=>{
        this.loader =false;
        this.blog = Response;
        for(var i in this.blog){
          if(this.blog[i].status=="Active"){this.blog[i].sts=1;}else{this.blog[i].sts=0;}
        }
      },
      error=>{
        this.loader =false;
        this.nodata = "No any blog posted at this time.";
      }
    );
  }
  delete(id:any){
    if (confirm('Are you sure you want to delete')){
      this.loader =true;this.blog=[];
      this.orgnigation.deleteBlog(id).subscribe(
        (Response:any)=>{
          this.loadBlog();
        }
      );
    }
  }
  updateBlog(pos:any){
    localStorage.setItem("ublog",JSON.stringify(this.blog[pos]));
  }
  updatePreview(pos:any){

  }

}
