import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';
import { User } from '../_models/user';

@Directive({
  selector: '[appHasRole]',
  standalone: false,
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  user: User;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user) => {
      this.user = user;
      this.updateView();
    });
  }
  private updateView(): void {
    if (!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }

    if (this.user.roles.some((r) => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
