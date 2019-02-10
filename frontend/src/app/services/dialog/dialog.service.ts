import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatConfirmDialogComponent } from 'src/app/mat-confirm-dialog/mat-confirm-dialog.component';
import { ProductComponent } from 'src/app/product/product.component';
import { Product } from 'src/app/models/product.model';
import { ProfileEditComponent } from 'src/app/profile-edit/profile-edit.component';
import { Profile } from 'src/app/models/profile.model';
import { ReviewComponent } from 'src/app/review/review.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }
  opendeletedialog () {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      position: { top: "10%" },
      data :{
        message : "Are you sure to delete this record ?"
      }
    })
  }

  openEditDialog (product: Product) {
    return this.dialog.open(ProductComponent, {
      width: '40%',
      height: '70%',
      position: { top: "10%" },
      data: product
    })
  }
  openProfileEditDialog (profile: Profile) {
    return this.dialog.open(ProfileEditComponent, {
      width: '40%',
      height: '75%',
      position: { top: "10%" },
      data: profile
    })
  }
  opencreateproduct () {
    return this.dialog.open(ProductComponent, {
      width: '40%',
      height: '70%',
      position: { top: "10%" }
    })
  }
  openreviewdialog(order){
    return this.dialog.open(ReviewComponent, {
      width: '40%',
      height: '70%',
      position: { top: "10%" },
      data: order
    })
  }
}
