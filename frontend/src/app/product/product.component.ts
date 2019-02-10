import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { DataService } from '../services/dataservice/dataservice.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('f') updateproduct: NgForm;
  constructor(
    private dialog: MatDialogRef<ProductComponent>,
    private ns:NotificationService,
    @Inject(MAT_DIALOG_DATA) public data) { }
    ngOnInit() { 
      if(!this.data){
        this.data = {
          name: '',
          description: '',
          price: ''
        }
      }
    }

  onSubmit () {
    const formdata = new FormData(document.querySelector('#addproduct'))
    formdata.append('id', this.data._id)
    this.dialog.close(formdata)
   // this.ns.success('updated')
  }

}
