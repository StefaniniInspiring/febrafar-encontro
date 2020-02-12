import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  name = '';
  rede = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get canContinue() {
    return this.name == '' || this.rede == '';
  }

  continue() {
    this.router.navigate(['../gifts'], {
      queryParams: {
        name: this.name,
        rede: this.rede
      }
    });
  }

}
