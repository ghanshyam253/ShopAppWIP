import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NotificationService } from '../services/notification/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Profile } from '../models/profile.model';
import { NgForm } from '@angular/forms';
import { DataService } from '../services/dataservice/dataservice.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  @ViewChild('f') updateproduct: NgForm;
  constructor(
    private dialog: MatDialogRef<ProfileEditComponent>,
    private ns:NotificationService,
    @Inject(MAT_DIALOG_DATA) public profile: Profile,
    private dataservice: DataService) { }
  ngOnInit() {  }

  onSubmit () {
    this.dataservice
    .updateprofile(this.updateproduct.value.profiledata)
    .subscribe(res => {
        this.dialog.close(true)
        this.ns.success(res)
      }, 
      err => {
        console.log(err)
        this.ns.success(err)
      })
  }
}
