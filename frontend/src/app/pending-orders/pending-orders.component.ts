import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice/dataservice.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  orders = [];

  ngOnInit() {
    this.dataservice
    .getpendingorders()
    .subscribe(res =>{
     // console.log(res)
      this.orders = res
    })
  }

}
