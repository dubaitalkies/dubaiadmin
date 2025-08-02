import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {
blog:any=[];loader:any=true;
  nodata:String="";
  project:any = localStorage.getItem("project");
  constructor(public orgnigation:OrgnigationService,private sanitizer: DomSanitizer) { 
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
    this.orgnigation.getVideoBlogs(this.project).subscribe(
      (Response:any)=>{
        this.loader =false;
        this.blog = Response;
        this.blog = Response.map((item: any) => {
                const sts = item.status === "Active" ? 1 : 0;
                const sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                    `https://www.youtube.com/embed/${item.images}`
                );
                return { ...item, sts, sanitizedVideoUrl };
            });

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
