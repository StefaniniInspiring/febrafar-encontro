import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.page.html',
  styleUrls: ['./gifts.page.scss']
})
export class GiftsPage implements OnInit {
  name = '';
  rede = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      try {
        this.name = params['name'];
        this.rede = params['rede'];
      } catch (error) {}
    });
  }

  max = 3;
  hoje = new Date();

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

  select(product) {
    product.selected = !product.selected;
  }

  get totalSelected() {
    let count = 0;
    this.products.map(product => (count += product.selected ? 1 : 0));

    return count;
  }

  disableProduct(product) {
    if (this.totalSelected == this.max) {
      return !product.selected;
    } else {
      return false;
    }
  }

  print() {
    let indexArray = [];
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].selected) {
        indexArray.push(i);
      }
    }

    this.router.navigate(['/print'], {
      queryParams: {
        indexes: JSON.stringify(indexArray),
        name: this.name,
        rede: this.rede
      }
    });
  }

  back() {
    this.router.navigate(['/info'], {
      queryParams: {
        name: this.name,
        rede: this.rede
      }
    });
  }

  @HostListener('document:keypress', ['$event'])
  goNext(event: KeyboardEvent) {
    if (event.keyCode == 13 && this.totalSelected >
       0) {
      this.print();
    }
  }
}
