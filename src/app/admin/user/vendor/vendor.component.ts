import { Component, OnInit } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
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
    let resp = this.orgnigation.getAllUser("Vendor",this.project);
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
}
