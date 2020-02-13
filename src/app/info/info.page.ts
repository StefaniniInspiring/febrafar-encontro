import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as Fuse from 'fuse.js';

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

  redes: any[] = [
    { name: 'Asfar' },
    { name: 'Augefarma' },
    { name: 'Bigfort' },
    { name: 'Biodrogas' },
    { name: 'Boa Farma' },
    { name: 'Cityfarma' },
    { name: 'Compre certo' },
    { name: 'Coperfarma' },
    { name: 'Droga Rede' },
    { name: 'Drogamais' },
    { name: 'Drogaria Atual' },
    { name: 'Drogaria Total' },
    { name: 'Drogarias Conceito' },
    { name: 'Drogarias Maestra' },
    { name: 'DSG Farma' },
    { name: 'Entrefarma' },
    { name: 'Farma 100' },
    { name: 'Farma & Cia' },
    { name: 'Farma & Farma' },
    { name: 'Farmácia Dias' },
    { name: 'Farmácias Associadas' },
    { name: 'Farmácias Conviva' },
    { name: 'FarmaGente' },
    { name: 'Farmagnus' },
    { name: 'AC Farma' },
    { name: 'Farmavale' },
    { name: 'Farmavip' },
    { name: 'FarMelhor' },
    { name: 'Redefarmes' },
    { name: 'Fazfarma' },
    { name: 'Grupofarma' },
    { name: 'Hiperfarma' },
    { name: 'Inova Drogarias' },
    { name: 'Drogarias Legítima' },
    { name: 'Líder Saúde' },
    { name: 'Liga Farma' },
    { name: 'Maxi Popular' },
    { name: 'Maxifarma' },
    { name: 'MG Farma' },
    { name: 'RM Farma' },
    { name: 'Farmácias Multmais' },
    { name: 'Nossa Rede' },
    { name: 'Nova Rede Drogarias' },
    { name: 'Pix Farma' },
    { name: 'Redefarma' },
    { name: 'maisfarma' },
    { name: 'Sanar Farmácias' },
    { name: 'SISfarma' },
    { name: 'StyloFarma' },
    { name: 'Super Popular' },
    { name: 'Tchê Farmácias' },
    { name: 'Uai Farma' },
    { name: 'Ultra Popular' },
    { name: 'União Farma' },
    { name: 'Unifarma' },
    { name: 'Vida Farmácias' },
    { name: 'Drogarias Viva Mais' }
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
    
    if (value.length > 4) {      
      const options = {
        caseSensitive: false,
        keys: ['name'],
        includeScore: true,
        threshold: 0.15
      };
      this.errorRede = value == '';
      let fuse = new Fuse(this.redes, options);
      const found = fuse.search(value);
      if (found.length > 0) {
        const resp = found[0];    
        this.rede = resp.item.name;    
      }
    }
  }

  get redeIndex() {
    return ((this.redes.findIndex(rede => rede.name == this.rede)) + 1).toString().padStart(2, '0');
  }

  isErrorImg(error) {
    this.errorImg = error;
  }
}
