import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice/dataservice.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { DialogService } from '../services/dialog/dialog.service';
import { NotificationService } from '../services/notification/notification.service';


@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent implements OnInit {

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
    this.dataservice
    .getpendingorders()
    .subscribe(res =>{
     // console.log(res)
      this.orders = res
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
