import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  selectedpayment: String = null
  payments: String[] = ['Card1', 'Card2', 'Card3']
  gngtoaddnew: Boolean = false
  constructor(private router: Router) { }

  ngOnInit() { }

  addnewcard(){
    this.gngtoaddnew = true
    console.log(this.gngtoaddnew)
  }
  gotoreview () {
    this.router.navigate(['review'])
  }
}
