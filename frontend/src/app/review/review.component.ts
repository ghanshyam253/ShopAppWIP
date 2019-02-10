import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @ViewChild('f') reviewformdata: NgForm;
  constructor(
    private dialog: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data
   ) { }

  ngOnInit() {  
  }

  onSubmit () {
    this.dialog.close(this.reviewformdata.form.value)
  }

}
