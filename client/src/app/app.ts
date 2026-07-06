import { Component, inject, OnInit } from '@angular/core';
import { FlowbiteService } from './core/service/flowbite.service';
import { ThemeService } from './core/service/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private flowbiteService = inject(FlowbiteService);
  private themeService = inject(ThemeService);
  ngOnInit(): void {
    this.flowbiteService.initFlowbite();
    this.themeService.setTheme(true);
  }
}