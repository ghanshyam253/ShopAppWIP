

import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/loginservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginservice: LoginService;
  constructor(private ls: LoginService) { this.loginservice = this.ls }

  ngOnInit() { }

}
