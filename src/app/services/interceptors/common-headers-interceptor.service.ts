import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class CommonHeadersInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('upload')) {
      const clone = req.clone();
      return next.handle(clone);
      }else{
        const clone = req.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          } 
        });
      return next.handle(clone);
      }

   
  }
}
