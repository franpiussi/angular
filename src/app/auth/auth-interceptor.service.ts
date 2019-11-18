import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private route: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const token = localStorage.getItem('token');

    let request = req;
    console.log(request);
    if(token){
      request = req.clone({
        setHeaders: {
          Authorization : `Bearer ${ token }`
        }
      })
    }

    return next.handle(request).pipe(
        catchError((err: HttpErrorResponse)=> {

          if (err.status === 401) {
            this.route.navigateByUrl('/login');
          }
          return throwError( err );
        })
    )
  }
}
