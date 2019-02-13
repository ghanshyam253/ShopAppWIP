import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogService } from '../services/dialog/dialog.service';
import { DataService } from '../services/dataservice/dataservice.service';
import { Product } from '../models/product.model';
import config from 'src/app/config/config.env'
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  data: Product[];
  imageurl = config.url + "image?_id="
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private dialogservice: DialogService,
    private dataservice: DataService) {
    iconRegistry.addSvgIcon(
        'edit',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/edit.svg'))
    iconRegistry.addSvgIcon(
        'delete',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/delete.svg'))
  }

  ngOnInit() { 
    this.dataservice.getData().subscribe(
      res => {
        console.log(res)
        this.data = res
      }
    )
  }

  addToCart (product: Product) {
    product.quantity =1;
    this.dataservice.addToCart(product)
  }
}
