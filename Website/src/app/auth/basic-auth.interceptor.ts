import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const currentUser = this.authenticationService.currentUserValue;
        
        if (currentUser && currentUser.authdata) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${currentUser.authdata}`
                }
            });
        }

        return next.handle(request).pipe( tap(() => {},
        (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
           return;
          }
          
          this.router.navigate(['/login']);
        }
      }));
    }
}
