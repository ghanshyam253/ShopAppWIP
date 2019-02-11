import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice/dataservice.service';
import { DialogService } from '../services/dialog/dialog.service';
import { NotificationService } from '../services/notification/notification.service';

import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

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
    let token;
    if(localStorage.getItem('role') == 'admin'){
      token = localStorage.getItem('userid')
    }else{
      token = localStorage.getItem('id')
    }

    this.dataservice
    .getorderforuser(token)
    .subscribe(res =>{
     // console.log(res)
      this.orders = res
    })
  }

  writereview (order) {
    this.dialogservice
    .openreviewdialog(order)
    .afterClosed()
    .subscribe(res => {
     if(res){
      this.dataservice
      .updatereview(order._id, res)
      .subscribe(res => {
        this.ns.success('review submitted')
        this.ngOnInit()
      }, err => {
        this.ns.warn('unable to submit review')
      })
     }
    },
    err => {
      this.ns.warn('unable to submit review')
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
