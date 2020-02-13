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
  errorName = false;
  errorRede = false;

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
    return !this.errorName && !this.errorRede &&
      this.name != undefined && this.rede != undefined &&
      this.name.length > 1 && this.rede.length > 1;
  }

  continue() {
    this.router.navigate(['../gifts'], {
      queryParams: {
        name: this.name,
        rede: this.rede
      }
    });
  }

  verifyName(ev) {
    let value = ev.srcElement.value;
    this.errorName = value == '';
  }

  verifyRede(ev) {
    let value = ev.srcElement.value;
    this.errorRede = value == '';
  }

}
