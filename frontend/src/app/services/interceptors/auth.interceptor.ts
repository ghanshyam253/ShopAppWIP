import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../authentication/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authservice: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let modifiedreq = req.clone()
        if(this.authservice.getToken()){
          //  console.log('intercepted', this.authservice.getToken())
            modifiedreq = req.clone({ headers: req.headers.append('token', this.authservice.getToken()) })
        }
        return next.handle(modifiedreq)
    }
}