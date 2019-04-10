import { Component, OnInit, ViewChild, NgZone  } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/dataservice/dataservice.service';
import {WindowRefService} from '../services/window-ref.service';
import { NgForm } from '@angular/forms';
import { CardDetails } from '../models/card.model';
import { Address } from '../models/address.model';
import { Order } from '../models/order.model';
import swal from 'sweetalert2';
import { NotificationService } from '../services/notification/notification.service';
import { MatHorizontalStepper } from '@angular/material';
import _ from 'underscore'
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  addresses: Address[];
  isaddress: Boolean = false
  payments: CardDetails[];
  gngtoaddnew: Boolean = false
  selectedaddress: String = null
  selectedpayment: String = null
  razorpay_payment_id: String =null
  reviewaddress: Address;
  reviewCardDetails: CardDetails;
  firstFormGroup;
  secondFormGroup;
  @ViewChild('addressform') addressform: NgForm
  @ViewChild('carddetails') carddetails: NgForm
  @ViewChild('stepper') stepper: MatHorizontalStepper
  orders: Order[];
  Razorpay :any;
  options :any;
  constructor(private ngZoneService: NgZone, private router: Router, private winRef: WindowRefService,
  private dataservice: DataService, private ns: NotificationService) { 
    console.log('Native window obj', winRef.nativeWindow);
    this.Razorpay = winRef.nativeWindow.Razorpay;
    let that= this;
      this.options = {
    "key": "rzp_test_or67bVztRnGPe5",
    "amount": "59900", /// The amount is shown in currency subunits. Actual amount is ?599.
    "name": "Merchant Name",
    "currency": "INR", // Optional. Same as the Order currency
    "description": "Purchase Description",
    "handler": (response)=>{
        this.ngZoneService.run(() => { // <== added
                    that.razorpay_payment_id = response.razorpay_payment_id;
                    that.placeorder();
                 });
      console.log(response);
//      console.log(obk);
        //alert(response.razorpay_payment_id);
    },
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "test@test.com",
        "contact": "8275299312",
        "method":"card" //{card|netbanking|wallet|emi|upi}
    },
    "notes": {
        "address": "Hello World"
    },
    "theme": {
        "color": "#F37254"
    }
};
   }
   self=this;

  ngOnInit() { 
    this.dataservice
    .getAddress()
    .subscribe(res => {
      console.log(res)
      this.addresses = res
    })

    this.dataservice
    .getPayments()
    .subscribe(res => {
      console.log(res)
      this.payments = res
    })

    this.dataservice
    .getOrders()
    .subscribe(res =>{
      this.orders = res
    })
  }

  addaddress(){
    this.selectedaddress = null
    this.isaddress = true
    //console.log(this.addressform)
  }
  addcard(){
    this.selectedpayment = null
    this.gngtoaddnew = true
    //console.log(this.gngtoaddnew)
  }
  addnewaddress() {
    var rzp1 = this.Razorpay(this.options);
console.log(rzp1);
    this.dataservice
    .addaddress({ ...this.addressform.value.addressdata, userid: localStorage.getItem('id') })
    .subscribe(res => {
      this.selectedaddress = res["_doc"]['_id'];
      this.selectedaddress = res["_doc"]["_id"];
      this.reviewaddress =res["_doc"];
      this.ns.success(res['message'])
//      this.ngOnInit()
    
      this.stepper.next()
      var rzp1 = this.Razorpay(this.options);
      rzp1.open();

//      this.goToCardDetails()
    })
  }
  addnewcard () {
    console.log(this.carddetails.value.carddata)
    this.dataservice
    .addcard({ ...this.carddetails.value.carddata, userid: localStorage.getItem('id') })
    .subscribe(
      res => {
        this.selectedpayment = res["_doc"]['_id']
        this.reviewCardDetails = res["_doc"];
        this.ns.success(res['message'])
        this.stepper.next()
//        this.ngOnInit()
//        this.goToReviewPage()
      })
  }
  placeorder () {
    // swal('Congratulations!', 'Order Placed successfully', 'success')
    // this.router.navigate(['user'])
    this.orders.map(order => {
      order.orderStatus = "ORDER PLACED";
      order.orderDate = new Date();
      return order;
    })
    debugger;
    this.dataservice
    .placeorder(this.orders,this.razorpay_payment_id, this.selectedaddress)
    .subscribe(res => {
      console.log(res)
      swal('Congratulations!', 'Order Placed successfully', 'success')
      this.stepper.next();
//      this.router.navigate(['user'])
    })
    this.dataservice
    .emptycart()
    .subscribe(res => {
      console.log(res)
    })


  }
  goToCardDetails () {
    let selectedaddress = this.selectedaddress 
    //console.log(this.addresses, selectedaddress)
    this.reviewaddress = _.filter(this.addresses, function(address){
      return address._id == selectedaddress
    })[0]
    console.log(this.reviewaddress)
    this.stepper.next()
     var rzp1 = this.Razorpay(this.options);
     rzp1.open();
  }
  goToReviewPage(){
    let selectedpayment = this.selectedpayment
    //console.log(this.payments, selectedpayment)
    this.reviewCardDetails = _.filter(this.payments, function(card){
      return card._id == selectedpayment
    })[0]
    console.log(this.reviewCardDetails)
    this.stepper.next()
  }
}
