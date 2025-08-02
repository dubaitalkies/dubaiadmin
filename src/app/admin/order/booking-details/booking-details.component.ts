import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrgnigationService } from 'src/app/service/orgnigation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  public imgUrl:string = environment.imgUrl;
  product:any={addressid:"!!!!",userid:"!!!!!"};sucs:any;
  message:String="Booking succesfully updated!";
  constructor(public orgnigation:OrgnigationService) { 
    var prd = localStorage.getItem("booking");
    if(prd!=null){
      this.product = JSON.parse(prd);
      this.products();
    }
  }

  booked:any = new FormGroup({});

  ngOnInit(): void {
  }

  update(){
    localStorage.setItem("prod",JSON.stringify(this.orderlist));
    localStorage.setItem("booking",JSON.stringify(this.product));
    var prod=[];
    var prodata = localStorage.getItem("prod");
    if(prodata!=null){prod = JSON.parse(prodata)}
    
    for(var i in prod){
      prod[i].userid = this.product.userid.split("!")[2];
      prod[i].addressid = this.product.addressid.split("!")[4];
      prod[i].productid = this.product.productid.split("!")[1];
      prod[i].status = this.product.status;
      prod[i].deleveryStatus = this.product.deleveryStatus;
    }
    
    
    this.orgnigation.saveAllbooking(prod).subscribe();
    

    /* localStorage.setItem("booking",JSON.stringify(this.product));
    this.product.userid = this.product.userid.split("!")[2];
    this.product.addressid = this.product.addressid.split("!")[4];
    this.product.productid = this.product.productid.split("!")[1];
    this.orgnigation.saveBooking(this.product).subscribe(); */

    this.sucs =true;
    /* var dta = localStorage.getItem("booking");
    if(dta!=null){
      this.product = JSON.parse(dta);
    } */
  }


  orderlist:any=[];
  totalamnt:any=0;subtotal:any=0;
  loader:any=false;
  products(){
    this.totalamnt=0;
    this.loader=true;
    this.orgnigation.getBookingbyid(this.product.bookingid).subscribe(
      Response=>{
        this.orderlist=Response;this.loader=false;
        for(var i in this.orderlist){
          this.totalamnt += (this.orderlist[i].amount * this.orderlist[i].quantity)
        }
        this.subtotal = this.totalamnt;
        this.totalamnt += (this.product.shipping*1);
      }
    );
  }

}
