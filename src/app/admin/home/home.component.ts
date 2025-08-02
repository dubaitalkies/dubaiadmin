import { Component, OnInit } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:any;
  username:any;useremail:any;
  admin=localStorage.getItem('admin');
  project:any = localStorage.getItem("project");

  data:any={ "id": "0", "userid": "0", "video": "0", "address": "0", "quntity": "0,0,0", "paydate": "0" };
  constructor(private orgnigation:OrgnigationService) { 
    
    if(this.admin!=null){
      this.user = JSON.parse(this.admin);
      this.username = this.user.name;
      this.useremail = this.user.email;
      this.fetchData();
    }
  }

  ngOnInit(): void {
  }
  fetchData(){
    let resp = this.orgnigation.getAdmin(this.user.id,this.project);
    resp.subscribe(Response=>{
      this.data=Response;
    });
  }

  splited(data:any,pos:any){
    return data.split(",")[pos]
  }
}
