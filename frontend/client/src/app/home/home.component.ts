import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  registerMode = false;
  register() {
    this.registerMode = true;
  }
  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
