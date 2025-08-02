import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  user:any=[];
  classes:any=[];
  nodata:String="";
  loging:any=true;
  loader:any=false;
  project:any = localStorage.getItem("project");
  constructor(public orgnigation:OrgnigationService) {
    this.fetchData();
  }
  ngOnInit(): void {
  }
  
  fetchData(){
    this.user=[];this.loging=true;this.nodata="";
    let resp = this.orgnigation.getAllUser("Member",this.project);
    resp.subscribe(
      Response=>{this.user=Response;this.nodata="";this.loging=false;},
      error=>{this.nodata="No any member at this time.";this.user=[];this.loging=false;})
  }

  delete(idd:any){
    if (confirm('Are you sure you want to delete')){
      this.orgnigation.deleteUser(idd).subscribe(()=> {
        this.fetchData();
      });
    }
  }

  excelPrint(){
    if(this.user.length>0){
      var userdata=[];
      for(var i in this.user){
        var ros = {
          "Sr. No.": Number(i)+1,
          "Userid":this.user[i].userid,
          "Name":this.user[i].name,
          "Contact":this.user[i].contact,
          "Email":this.user[i].email,
          "City":this.user[i].city
        };
        userdata.push(ros)
      }
      //this.excel.exportAsExcelFile(userdata, 'students'); 
    }
    else{
      alert("No any student founr");
    }
  }

  userdata(i:any){
    localStorage.setItem("cuser",JSON.stringify(this.user[i]));
  }
}
