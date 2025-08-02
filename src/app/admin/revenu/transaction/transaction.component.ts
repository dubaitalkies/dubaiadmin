import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  public imgUrl:string = environment.imgUrl;
  type:any;orderlist:any=[];
  project:any = localStorage.getItem("project");
  constructor(public orgnigation:OrgnigationService) { 
    this.type="completed";
    this.fetchData();
  }

  ngOnInit(): void {
    
  }
  user:any=[];loging:any=true;nodata:String="";
  fetchData(){
    this.user=[];this.loging=true;this.nodata="";
    let resp = this.orgnigation.getBookingByStatus([this.type],this.project);
    resp.subscribe(
      Response=>{this.user=Response;this.nodata="";this.loging=false;},
      error=>{this.nodata="No any booking present at this time.";this.user=[];this.loging=false;})
  }


  totalamnt:any=0;
  loader:any=false;
  curntOrder:any={addressid:"!!!!",userid:"!!!!!"};
  view(pos:any){
    this.curntOrder = this.user[pos];
    this.totalamnt=0;
    this.loader=true;
    this.orgnigation.getBookingbyid(this.curntOrder.bookingid).subscribe(
      Response=>{
        this.orderlist=Response;this.loader=false;
        for(var i in this.orderlist){
          this.totalamnt += (this.orderlist[i].amount*1)
        }
        this.totalamnt += (this.curntOrder.shipping*1);
      }
    );
  }
}
