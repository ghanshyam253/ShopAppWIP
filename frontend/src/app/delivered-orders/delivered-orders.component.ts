import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice/dataservice.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { DialogService } from '../services/dialog/dialog.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-delivered-orders',
  templateUrl: './delivered-orders.component.html',
  styleUrls: ['./delivered-orders.component.css']
})
export class DeliveredOrdersComponent implements OnInit {

 
  constructor(
    private dataservice: DataService,
    private dialogservice: DialogService,
    private ns: NotificationService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon('edit', sanitizer.bypassSecurityTrustResourceUrl('assets/img/edit.svg'))
      iconRegistry.addSvgIcon('delete', sanitizer.bypassSecurityTrustResourceUrl('assets/img/delete.svg'))
  }

  orders = [];

  ngOnInit() {
    var statusForFetch = "ORDER DELIVERED";
    this.dataservice
    .getAllOrdersByStatus(statusForFetch)
    .subscribe(res =>{
      console.log(res);
      for(var q=0; q< res.length; q++){
        for(var g=0; g<res[q].orderdetails.length; g++){
          console.log(res[q].orderdetails[g].orderDate)
        }
      }
      this.orders = res; 

    })

  }
  orderPickedForDelivery(groupOrderDetails, singleOrderDetails) {

    let orderId = singleOrderDetails._id;
    let status = "ORDER DELIVERED";
    
    this.dialogservice
    .openOrderPickudForDeliveryDialog()
    .afterClosed()
    .subscribe(res =>{
      if(res){
//        call service to delete order
        this.dataservice
        .updateOrderStatus(orderId, status)
        .subscribe(res => {
          this.ngOnInit()
          this.ns.warn(res)
        })
      }
    })
  }
}
