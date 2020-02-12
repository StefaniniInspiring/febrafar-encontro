import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  name = '';
  rede = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      try {
        this.name = params['name'];
        this.rede = params['rede'];
      } catch (error) {
        this.name = '';
        this.rede = '';
      }
    });
  }

  ngOnInit() {
  }

  get canContinue() {
    return this.name == undefined || this.rede == undefined ||
    this.name == '' || this.rede == '';
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
