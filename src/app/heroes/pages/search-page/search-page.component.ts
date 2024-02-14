import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``,
})
export class SearchPageComponent {
  public heroSearch = new FormControl('');
  public heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {}

  getHeroes() {
    let value: string = '';
    if (this.heroSearch.value) value = this.heroSearch.value;
    this.heroesService
      .getSuggestions(value)
      .subscribe(heroes => {
        this.heroes = heroes
      });
  }
}
