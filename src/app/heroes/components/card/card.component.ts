import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit{

  @Input()
  public hero!: Hero

  public creadores = [
    {
      name: 'DC Comics',
      display: 'DC - Comics',
    },
    {
      name: 'Marvel Comics',
      display: 'Marvel - Comics',
    },
    {
      name: 'AOT',
      display: 'Attack on titan - Manga',
    }
  ];

  ngOnInit(): void {
    if (!this.hero) throw new Error('Method not implemented.');
  }
}
