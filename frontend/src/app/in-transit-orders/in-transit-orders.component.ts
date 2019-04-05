import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice/dataservice.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { DialogService } from '../services/dialog/dialog.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-in-transit-orders',
  templateUrl: './in-transit-orders.component.html',
  styleUrls: ['./in-transit-orders.component.css']
})
export class InTransitOrdersComponent implements OnInit {


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
    var statusForFetch = "ORDER IN TRANSIT";
    this.dataservice
    .getAllOrdersByStatus(statusForFetch)
    .subscribe((res:any[]) =>{
      console.log(res);
      this.orders = res
    })

  }
  orderDelivered(groupOrderDetails, singleOrderDetails) {

    let orderId = singleOrderDetails._id;
    let status = "ORDER DELIVERED";
    
    this.dialogservice
    .openOrderDeliveredDialog()
    .afterClosed()
    .subscribe(res =>{
      if(res){
//        call service to delete order
        this.dataservice
        .updateOrderStatus(orderId, status)
        .subscribe(res => {
          this.ngOnInit()
          this.ns.success("Ordered Delivered!!")
        })
      }
    })
  }


}
