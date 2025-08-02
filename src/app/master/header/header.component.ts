import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name:any="Sachin Misra";
  data:any;
  project:any = "1";
  dropac:any=false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.data = localStorage.getItem("admin");
    if(this.data == null){
      this.router.navigate(['/login']);
    }
    else{
      this.data = JSON.parse(this.data);
      this.name = this.data.name;

      if(this.data.email!="medlyfechemist@gmail.com"){
        this.dropac = true;
      }
    }


    var proj = localStorage.getItem("project");
    if(proj!=null){
      this.project = proj;
      if(this.project==1){localStorage.setItem("url","https://www.dubaitalkies.com/");localStorage.setItem("imgurl","https://dubaitalkies.com/");}
    }
    else{
      localStorage.setItem("project",this.project);
      localStorage.setItem("url","https://www.dubaitalkies.com/");
      localStorage.setItem("imgurl","https://dubaitalkies.com");
    }

  }

  logout(){
    localStorage.removeItem("admin");
    this.router.navigate(['/login']);
  }

  changeEvent(){
    if(this.project==1){localStorage.setItem("url","https://www.dubaitalkies.com/");localStorage.setItem("imgurl","https://dubaitalkies.com/");}
    localStorage.setItem("project",this.project);
    window.location.href = "/";
  }

}
