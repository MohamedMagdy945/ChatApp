import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { Member } from '../_models/member';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  username: string;
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }
  currentUser: User | null = null;
  getCurrentUser() {
    this.accountService.currentUser$.subscribe({
      next: (user: any) => {
        this.currentUser = user;
      },
      error: (err) => console.error('Error getting current user', err),
    });
  }
}
