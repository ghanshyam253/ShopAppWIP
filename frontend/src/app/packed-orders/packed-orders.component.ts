import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice/dataservice.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { DialogService } from '../services/dialog/dialog.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-packed-orders',
  templateUrl: './packed-orders.component.html',
  styleUrls: ['./packed-orders.component.css']
})
export class PackedOrdersComponent implements OnInit {


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
    var statusForFetch = "ORDER PROCESSED PACKED";
    this.dataservice
    .getAllOrdersByStatus(statusForFetch)
    .subscribe((res:any[]) =>{
      console.log(res);
      this.orders = res
    })

  }
  orderPickedForDelivery(groupOrderDetails, singleOrderDetails) {

    let orderId = singleOrderDetails._id;
    let status = "ORDER IN TRANSIT";
    
    this.dialogservice
    .openOrderPickedForDeliveryDialog()
    .afterClosed()
    .subscribe(res =>{
      if(res){
//        call service to delete order
        this.dataservice
        .updateOrderStatus(orderId, status)
        .subscribe(res => {
          this.ngOnInit()
          this.ns.success("Ordered Picked For Delivery!!")
        })
      }
    })
  }


}
