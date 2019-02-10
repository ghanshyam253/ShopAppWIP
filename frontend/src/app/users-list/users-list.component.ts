import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataService } from '../services/dataservice/dataservice.service';
import { Router } from '@angular/router';

export interface UserData {
  name: String;
  emailaddress: String;
  Username: String;
  phonenumber: String
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'emailaddress', 'Username', 'phonenumber'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataservice: DataService, private router: Router) {
    this.dataservice
    .getallusers()
    .subscribe(res => {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit() { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showorders (row) {
    localStorage.setItem('userid', row._id)
    this.router.navigate(['userorders'])
  }
}
