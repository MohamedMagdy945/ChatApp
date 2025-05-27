import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  return next(req).pipe(
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
              throw modelsStateErrors;
            } else {
              toastr.error(error.statusText, error.status);
            }
            break;
          case 401:
            toastr.error(error.statusText, error.status);
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
};
