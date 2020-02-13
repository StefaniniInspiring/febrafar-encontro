import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss']
})
export class InfoPage implements OnInit {
  name = '';
  rede = '';
  errorName = false;
  errorRede = false;
  errorImg = true;

  redes = [
    'Asfar',
    'Augefarma',
    'Bigfort',
    'Biodrogas',
    'Boa Farma',
    'Cityfarma',
    'Compre certo',
    'Coperfarma',
    'Droga Rede',
    'Drogamais',
    'Drogaria Atual',
    'Drogaria Total',
    'Drogarias Conceito',
    'Drogarias Maestra',
    'DSG Farma',
    'Entrefarma',
    'Farma 100',
    'Farma & Cia',
    'Farma & Farma',
    'Farmácia Dias',
    'Farmácias Associadas',
    'Farmácias Conviva',
    'FarmaGente',
    'Farmagnus',
    'AC Farma',
    'Farmavale',
    'Farmavip',
    'FarMelhor',
    'Redefarmes',
    'Fazfarma',
    'Grupofarma',
    'Hiperfarma',
    'Inova Drogarias',
    'Drogarias Legítima',
    'Líder Saúde',
    'Liga Farma',
    'Maxi Popular',
    'Maxifarma',
    'MG Farma',
    'RM Farma',
    'Farmácias Multmais',
    'Nossa Rede',
    'Nova Rede Drogarias',
    'Pix Farma',
    'Redefarma',
    'maisfarma',
    'Sanar Farmácias',
    'SISfarma',
    'StyloFarma',
    'Super Popular',
    'Tchê Farmácias',
    'Uai Farma',
    'Ultra Popular',
    'União Farma',
    'Unifarma',
    'Vida Farmácias',
    'Drogarias Viva mais'
  ];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
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

  ngOnInit() {}

  get canContinue() {
    return (
      !this.errorName &&
      !this.errorRede &&
      this.name != undefined &&
      this.rede != undefined &&
      this.name.length > 1 &&
      this.rede.length > 1
    );
  }

  continue() {
    if (!this.canContinue) {
      this.errorName = this.name == undefined || this.name.length == 0;
      this.errorRede = this.rede == undefined || this.rede.length == 0;

      return;
    }

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

  get redeIndex() {
    return ((this.redes.findIndex(rede => rede == this.rede)) + 1).toString().padStart(2, '0');
  }

  isErrorImg(error) {
    this.errorImg = error;
  }
}
