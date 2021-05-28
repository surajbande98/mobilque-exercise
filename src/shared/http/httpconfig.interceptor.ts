import { Injectable } from "@angular/core";

import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { LoginService } from "src/app/authentication/services/login.service";
import { ConfigurationService } from './configuration.service';

@Injectable()
export class HttpConfigInterceptor {
  error: any = {
    error: {
      errorCode: "WENT_WRONG"
    }
  };

  constructor(private router: Router, private loginService: LoginService, private config: ConfigurationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    let request = req.clone({
      setHeaders: {
        Authorization: `Bearer ` + sessionStorage.getItem("token")
      }
    });
    if(!req.url.includes('i18n/en.json')) {
      request = req.clone({
      setHeaders: {
        Authorization: `Bearer ` + sessionStorage.getItem("token"),
        'IP-ADDRESS': sessionStorage.getItem("IP_ADDRESS"),
        'IP-LOCATION': sessionStorage.getItem("IP_LOCATION")
      }
    });
    }

    return next
      .handle(request)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.headers.get("Authorization") != null) {
              sessionStorage.setItem(
                "token",
                event.headers.get("Authorization")
              );
            }

            if (event.body.errorCode === "SESSION_EXPIRED") {
              this.clearSession();
            }
          }
          return event;
        })
      )
      .pipe(
        catchError((err: HttpEvent<any>) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              if (err.error.errorCode == "USER_LOGIN_LOCKED") {
                sessionStorage.clear();
                this.router.navigateByUrl("");
                setTimeout(() => {
                  this.loginService.userAccountLockedSubject.next(true);
                }, 2);

                return throwError(err);
              }
              else if(err.error.errors){
                return throwError(err);
              }
              else if(err.error.errorCode == "OTP_FAILED" || err.error.errorCode == "USER_LOGIN_LOCKED" 
              || err.error.errorCode == "INVALID_CREDENTIALS"){
                return throwError(err);
              }
              else {
                this.clearSession();

              }
            } else if (
              err.status === 400 ||
              err.status === 403 ||
              err.status === 500 ||
              err.status === 417
            ) {
              if (err.error && err.error.errorCode) {
                if (err.error.errorCode === "INVALID_COOKIE") {
                  this.clearSession();
                  return throwError("");
                } else if (err.error.errorCode === "USER_LOGIN_LOCKED") {
                  sessionStorage.clear();
                  this.router.navigateByUrl("");
                  setTimeout(() => {
                    this.loginService.userAccountLockedSubject.next(true);
                  }, 2);
                }
                return throwError(err);
              }
              if (req.url.indexOf(this.config.ApiUrl+this.config.getBOValidateUrl) > -1){
                return throwError(err.error);
              }
              return throwError(this.error);
            } else {
              const excludePollingApis = [
                this.config.ApiUrl+this.config.getLoginPollAuthCodeUrl+'/',
                this.config.ApiUrl+this.config.deviceRegQrCodeScanLongPollingUrl+'/'
              ];

              const currentUrl = this.filterUrls(req.url);
              if (excludePollingApis.indexOf(currentUrl) > -1) {
                return throwError(err);
              }

              return throwError(this.error);
            }
          }
          return throwError("");
        })
      );
  }

  clearSession() {
    sessionStorage.clear();
    window.location.href = "/";
  }

  filterUrls(url) {
    if (url.search("sca/devices/authorization/status/")) {
      var str = url.substr(url.lastIndexOf("/") + 1) + "$";
      return url.replace(new RegExp(str), "");
    }
    return url;
  }
}
