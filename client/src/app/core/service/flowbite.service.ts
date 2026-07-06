import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlowbiteService {
  private platformId = inject(PLATFORM_ID);

  initFlowbite(callback?: () => void): void {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite')
        .then(({ initFlowbite }) => {
          initFlowbite();
          if (callback) callback();
        })
        .catch(err => console.error('Failed to load Flowbite:', err));
    }
  }
}