import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';
import config from 'src/app/config/config.env'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private Admin: Boolean = false;
  constructor(private router: Router, private ns: NotificationService, private httpclient: HttpClient) { }

  login(credentials) {
    return this.httpclient.post(config.url + 'user/login', credentials)
  }
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('role')
    this.router.navigate(["login"])
  }

  isAdmin() {
    return localStorage.getItem('role') == 'admin'
  }
  isAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false
  }

  setAdmin(isAdmin) {
    this.Admin = isAdmin
  }
  register (registerdata) {
    return this.httpclient.post(config.url + 'user/create', registerdata, {responseType: 'text'})
  }
}
