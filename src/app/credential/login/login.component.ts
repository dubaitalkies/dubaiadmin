import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loader:any=false;
  constructor(private orgnigation:OrgnigationService,private router: Router) { }

  ngOnInit(): void {
    
  }

  user:any;
  
  credentials={id:"1",username:"",password:""}

  getData(){
    if(!this.loader){
      if(this.credentials.username=="dubaitalkies0@gmail.com" && this.credentials.password=="dubai@224466"){
          localStorage.setItem("admin",JSON.stringify({name:"Dubaitalkies"}));
          this.router.navigate(['/']);
      }
      else{
        alert("Please enter userid and password!");
      }
    }
  }
}
