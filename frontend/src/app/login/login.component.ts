import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/loginservice.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('LoginForm') loginForm: NgForm;
  @ViewChild('registerform') registerForm: NgForm;
  constructor(private router: Router, private loginservice: LoginService) { }
  ngOnInit() {
    console.log(document.body.classList)
    document.body.classList.add('body')
  }
  login() : void {
   // console.log(this.loginForm.value.logindata)
    this.loginservice
    .login(this.loginForm.value.logindata)
    .subscribe(res => {
           this.loginForm.reset()
           localStorage.setItem('token', res['token'])
           localStorage.setItem('role', res['role'])
           localStorage.setItem('id', res['id'])
           document.body.classList.remove('body')
           document.body.classList.add('background')
           if(res['role'] == 'admin'){
              this.loginservice.setAdmin(true)
              this.router.navigate(["dashboard"]);
              return
            }
            this.loginservice.setAdmin(false)
            this.router.navigate(["user"]);
    },
    err => {
      console.log(err)
      alert("Invalid credentials");
    })
   }

   register() {
    this.loginservice
    .register({ ...this.registerForm.value.registerdata, role: 'user', isBlocked: false})
    .subscribe(
      res => {
        this.registerForm.reset()
        swal('congratulations!','Registration successfull','success')
      },
      err => {
        swal('Failure','check details','error')
      }
    )
   }
}
