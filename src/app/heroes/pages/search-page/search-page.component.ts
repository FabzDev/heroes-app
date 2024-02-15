import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``,
})
export class SearchPageComponent implements OnInit {
  public heroSearch = new FormControl('');
  public heroes: Hero[] = [];
  public searchSubject: Subject<string> = new Subject<string>();
  public switchOpt: boolean = false;
  public selectedHero?: Hero | undefined;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(500)).subscribe((inputText) => {
      this.otraFuncion(inputText);
    });
  }

  inputEvent() {
    const inputText: string = this.heroSearch.value || '';
    if (inputText == '') {
      this.switchOpt = false;
      this.heroes = [];
    } else {
      this.searchSubject.next(inputText);
    }
  }

  otraFuncion(inputOnInit: string) {
    this.heroesService.getSuggestions(inputOnInit).subscribe((heroes) => {
      this.heroes = heroes;
      this.switchOpt = true;
    });
  }

  selectedOption(event: MatAutocompleteSelectedEvent): void {
    this.selectedHero = event.option.value;
    if (this.selectedHero) {
      this.heroSearch.setValue(this.selectedHero.superhero);
    }
  }
}
