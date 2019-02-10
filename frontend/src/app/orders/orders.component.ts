import { Component, OnInit, SimpleChanges } from '@angular/core';
import { DialogService } from '../services/dialog/dialog.service';
import { Router } from '@angular/router';
import { DataService } from '../services/dataservice/dataservice.service';
import { Order } from '../models/order.model';
import * as _ from 'underscore';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    private dialog: DialogService, 
    private router: Router,
    private dataservice: DataService,
    private ns: NotificationService
    ) { }
  orders: Order[] = [];
  ngOnInit() { 
    this.dataservice.getOrders().subscribe(res => {
      //console.log(res)
      this.orders = res
    })
  }

  onDelete (selectedele) {
    this.dialog.opendeletedialog().afterClosed().subscribe(res => {
      if(res){
        this.dataservice.removeitemfromcart(selectedele)
        .subscribe(
          res =>{
            this.ngOnInit()
            this.ns.warn('removed from cart')
          },
          err =>{
            console.log(err)
            this.ns.warn('error while removing from cart')
          })
      }
    })
  }
  
  checkout () {
    //console.log(this.orders)
    this.dataservice.setOrders(this.orders)
    this.router.navigate(["checkout"])
  }
}
