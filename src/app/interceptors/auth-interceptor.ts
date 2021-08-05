import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.getToken();

    if (!authToken) {
        return next.handle(req);
    }

    const authReq = req.clone(
    //   {
    //   headers: req.headers.set('Authorization', authToken)
    // }
      
      { setHeaders: { 
      ['Authorization']: `Bearer ${authToken}`,
      ['Access-Control-Allow-Origin']: '*',
      ["Access-Control-Allow-Headers"]: "Content-Type, Authorization"
     } });

    return next.handle(authReq);
  }
}