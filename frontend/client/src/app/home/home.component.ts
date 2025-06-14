import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private accountService: AccountService) {}
  ngOnInit(): void {
    this.getCurrentUser();
  }

  registerMode = false;
  register() {
    this.registerMode = true;
  }
  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
  getCurrentUser() {
    this.accountService.currentUser$.subscribe({
      next: (user) => (this.currentUser = user),
      error: (err) => console.error('Error getting current user', err),
    });
  }
}
