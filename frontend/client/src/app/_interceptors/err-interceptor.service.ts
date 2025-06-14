import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class errorInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const router = inject(Router);
    const toastr = inject(ToastrService);

    return next.handle(req).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modelsStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modelsStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modelsStateErrors.flat();
              } else if (typeof error.error === 'object') {
                toastr.error(error.error?.message || 'Bad Request', '400');
              } else {
                toastr.error(error.error, error.status);
              }
              break;
            case 401:
              toastr.error(error.error?.message || 'Unauthorized', '401');
              break;
            case 404:
              router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigateExtras: NavigationExtras = {
                state: { error: error.error },
              };
              router.navigateByUrl('/server-error', navigateExtras);
              break;

            default:
              toastr.error('Something unexpected went wrong');
              console.log(error);
              break;
          }
        }
        return throwError(() => error);
      })
    );
  }
}
