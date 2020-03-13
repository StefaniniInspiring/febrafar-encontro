import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.page.html',
  styleUrls: ['./print.page.scss']
})
export class PrintPage implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private analytics: AnalyticsService) {
    this.activatedRoute.queryParams.subscribe(params => {
      try {
        this.ids = JSON.parse(params['indexes']);
        this.name = params['name'];
      } catch (error) {}
    });
  }

  ids = [];
  name = '';
  rede = '';

  products = [
    {
      selected: false,
      name: 'Pirulito',
      id: 'pirulito',
      type: 'desconto_unidade'
    },
    {
      selected: false,
      name: 'Pingo de Leite',
      id: 'pingo_de_leite',
      type: 'desconto_unidade'
    },
    {
      selected: false,
      name: 'Chiclete Adams',
      id: 'chiclets',
      type: 'desconto_unidade'
    },
    {
      selected: false,
      name: 'Bombom Ouro Branco',
      id: 'ouro_branco',
      type: 'desconto_unidade'
    },
    {
      selected: false,
      name: 'Bombom Sonho de Valsa',
      id: 'sonho_devalsa',
      type: 'desconto_unidade'
    },
    { selected: false, name: 'Mentos', id: 'mentos', type: 'desconto' },
    { selected: false, name: 'Trident', id: 'trident', type: 'desconto' },
    { selected: false, name: 'Paçoquita', id: 'pacoquita', type: 'desconto' },
    {
      selected: false,
      name: 'Barrinha Cereal',
      id: 'barra_cereal',
      type: 'desconto'
    },
    {
      selected: false,
      name: 'Barrinha de frutas',
      id: 'barra_de_frutas',
      type: 'desconto'
    },
    {
      selected: false,
      name: '5 balas 7 Belo',
      id: 'bala_7_belo',
      type: 'fixed'
    },
    {
      selected: false,
      name: 'Bala de Goma',
      id: 'bala_de_goma',
      type: 'fixed'
    },
    { selected: false, name: 'TicTac', id: 'tictac', type: 'fixed' },
    { selected: false, name: 'Halls mini', id: 'halls_mini', type: 'fixed' },
    {
      selected: false,
      name: 'Pastilha Hortelã Garoto',
      id: 'pastilha_hortela',
      type: 'fixed'
    }
  ];

  ngOnInit() {}

  ionViewDidEnter() {
    setTimeout(() => {
      window.print();
      
      this.goBack();
    }, 1000);
  }

  goBack() {
    this.router.navigate(['/']).then(() => {
      window.dispatchEvent(new Event('endTracking'));

      this.analytics.trackPrint();
      
      this.ids.map(id => {
        this.analytics.trackGift(this.products[id]);
      });
    });
  }
}
