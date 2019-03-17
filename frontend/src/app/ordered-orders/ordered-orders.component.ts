import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice/dataservice.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { DialogService } from '../services/dialog/dialog.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-ordered-orders',
  templateUrl: './ordered-orders.component.html',
  styleUrls: ['./ordered-orders.component.css']
})
export class OrderedOrdersComponent implements OnInit {

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
    // 
    var statusForFetch = "ORDER PLACED";
    this.dataservice
    .getAllOrdersByStatus(statusForFetch)
    .subscribe(res =>{
      console.log(res);
      this.orders = res
    })
  }
  orderPacked(groupOrderDetails, singleOrderDetails) {

    let orderId = singleOrderDetails._id;
    let status = "ORDER PROCESSED PACKED";
    
    this.dialogservice
    .openOrderProcessedPackedDialog()
    .afterClosed()
    .subscribe(res =>{
      if(res){
//        call service to delete order
        this.dataservice
        .updateOrderStatus(orderId, status)
        .subscribe(res => {
          this.ngOnInit()
          this.ns.success("Ordered Processed and Packed!!")
        })
      }
    })
  }
  deleteOrder(productid){
    this.dialogservice
    .opendeletedialog()
    .afterClosed()
    .subscribe(res =>{
      if(res){
//        call service to delete order
        this.dataservice
        .deleteorder(productid)
        .subscribe(res => {
          this.ngOnInit()
          this.ns.warn(res)
        })
      }
    })
  }

}
