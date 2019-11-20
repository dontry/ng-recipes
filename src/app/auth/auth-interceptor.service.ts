import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpParams,
  HttpRequest
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        let modifiedReq = req;
        if (user && user.token) {
          modifiedReq = req.clone({
            params: new HttpParams().set("auth", user.token)
          });
        }
        return next.handle(modifiedReq);
      })
    );
  }
}
