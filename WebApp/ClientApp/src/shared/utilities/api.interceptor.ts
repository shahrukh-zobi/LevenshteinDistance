import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService,
    private localStorageService: LocalStorageService,
    public router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //add bearer token
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`,
      },
    });

    if (request.method !== 'GET') {
      return next.handle(request);
    }
    
    const cachedResponse: HttpResponse<any> = this.localStorageService.get(request.url);
    
    if (cachedResponse) {
      // return saved response in localStorage
      return of(new HttpResponse({ status: 200, body: cachedResponse.body }));
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // save response to localStorage
          this.localStorageService.save(request.url, event);
        }
      })
    );
  }
}