import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  @HostListener('document:keypress', ['$event'])
  goNext(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.router.navigate(['info']);
    }
  }
}
