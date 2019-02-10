import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/dataservice/dataservice.service';
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
  reviewaddress: Address;
  reviewCardDetails: CardDetails;
  firstFormGroup;
  secondFormGroup;
  @ViewChild('addressform') addressform: NgForm
  @ViewChild('carddetails') carddetails: NgForm
  @ViewChild('stepper') stepper: MatHorizontalStepper
  orders: Order[];
  constructor(private router: Router, private dataservice: DataService, private ns: NotificationService) {  }

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
    this.dataservice
    .addaddress({ ...this.addressform.value.addressdata, userid: localStorage.getItem('id') })
    .subscribe(res => {
      this.selectedaddress = res['id']
      this.ns.success(res['message'])
      this.ngOnInit()
      this.goToCardDetails()
    })
  }
  addnewcard () {
    console.log(this.carddetails.value.carddata)
    this.dataservice
    .addcard({ ...this.carddetails.value.carddata, userid: localStorage.getItem('id') })
    .subscribe(
      res => {
        this.selectedpayment = res['id']
        this.ns.success(res['message'])
        this.ngOnInit()
        this.goToReviewPage()
      })
  }
  placeorder () {
    // swal('Congratulations!', 'Order Placed successfully', 'success')
    // this.router.navigate(['user'])
    this.orders.map(order => {
      order.orderStatus = "ORDER PLACED";
      return order;
    })
    debugger;
    this.dataservice
    .placeorder(this.orders,this.selectedpayment, this.selectedaddress)
    .subscribe(res => {
      console.log(res)
      swal('Congratulations!', 'Order Placed successfully', 'success')
      this.router.navigate(['user'])
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
