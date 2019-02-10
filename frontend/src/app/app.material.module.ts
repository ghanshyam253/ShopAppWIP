import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatTabsModule, MatGridListModule, MatSelectModule, MatRadioModule, MatStepperModule, MatSnackBarModule, MatPaginatorModule, MatSortModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
@NgModule({
  imports: [
  CommonModule, 
  MatToolbarModule,
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatSelectModule,
  MatRadioModule,
  MatStepperModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDatepickerModule,
  MatNativeDateModule
  ],
  exports: [
  CommonModule,
   MatToolbarModule, 
   MatButtonModule, 
   MatCardModule, 
   MatInputModule, 
   MatDialogModule, 
   MatTableModule, 
   MatMenuModule,
   MatIconModule,
   MatProgressSpinnerModule,
   MatTabsModule,
   MatGridListModule,
   MatSelectModule,
   MatRadioModule,
   MatStepperModule,
   MatSnackBarModule,
   MatTableModule,
   MatPaginatorModule,
   MatSortModule,
   MatDatepickerModule,
   MatNativeDateModule
   ],
})
export class CustomMaterialModule { }