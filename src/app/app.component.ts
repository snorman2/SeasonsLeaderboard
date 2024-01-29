import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class') componentCssClass: string;

  constructor() {
    // Add your dark mode class here
    this.componentCssClass = 'dark-theme';
  }
}
