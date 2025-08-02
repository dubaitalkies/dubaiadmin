import { Component, OnInit } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  sucs:any;
  message:String="User succesfully updated!";
  userdata:any;
  constructor(public orgnigation:OrgnigationService) { 
    var user = localStorage.getItem("cuser");
    if(user!=null){
      this.userdata = JSON.parse(user);
    }
  }

  ngOnInit(): void {
  }

  saveproduct(){
    localStorage.setItem("cuser",JSON.stringify(this.userdata));
    this.orgnigation.saveUser(this.userdata).subscribe();
    this.sucs = true;
    window.scroll(0,0);
  }

}
