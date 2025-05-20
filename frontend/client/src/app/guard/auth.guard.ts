import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let userAccountService = inject(AccountService);
  let toastr = inject(ToastrService);
  return userAccountService.currentUser$.pipe(
    map((user) => {
      if (user) return true;
      toastr.error('You shall not pass !');
      return false;
    })
  );
};
