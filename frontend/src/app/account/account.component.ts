import { Component, OnInit } from '@angular/core';
import { DialogService } from '../services/dialog/dialog.service';
import { DataService } from '../services/dataservice/dataservice.service';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  profile: Profile;
  constructor(private dialogservice: DialogService, private dataservice: DataService) { }

  ngOnInit() {
    this.dataservice
      .getProfile()
      .subscribe(res =>{
        console.log(res)
        this.profile = res
      })
  }

  editprofile () {
    this.dialogservice
    .openProfileEditDialog(this.profile)
    .afterClosed()
    .subscribe(
      res => {
        if (res) {
          this.ngOnInit()
        }
      })
  }

}
