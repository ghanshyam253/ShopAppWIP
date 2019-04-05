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
    debugger;
    var data = {
  "key": "pxZqabH4",
  "txnid": "ORD39",
  "hash": "66c9413e808d34bb54c8c0a0a271db9d872e1ac80f03f18596272335af59aec0dbef6d033b6023cf80736daae2914f789ff18249f90c646e6e73c7d75a75a7f0",
  "amount": "6.00",
  "firstname": "gd",
  "email": "rochakdud@gmail.com",
  "phone": "9876543211",
  "productinfo": "P01,P02",
  "udf5": "BOLT_KIT_NODE_JS",
  "surl": "http://localhost:4200/login",
  "furl": "http://localhost:4200/login"
};
var boltPbj = bolt || {}
	boltPbj.launch(data,{ responseHandler: function(BOLT){
    console.log( BOLT.response.txnStatus );		
    if(BOLT.response.txnStatus != 'CANCEL')
    {
    }
  },
	catchException: function(BOLT){
 		alert( BOLT.message );
	}
});
return;
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
              this.router.navigate(["admindashboard"]);
              return
            }else if(res['role'] == 'vendor'){
               this.router.navigate(["orderedorders"]);
              return
            }else{
              this.loginservice.setAdmin(false)
              this.router.navigate(["user"]);
            }
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
