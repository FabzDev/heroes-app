import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { Subject, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``,
})
export class SearchPageComponent implements OnInit{
  public heroSearch = new FormControl('');
  public heroes: Hero[] = [];
  public searchSubject: Subject<string> = new Subject<string>();
  public inputText:string = '';

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.searchSubject
    .pipe(debounceTime(5000))
    .subscribe( inputText => this.otraFuncion(inputText))
  }

  inputEvent() {
    this.searchSubject.next(this.inputText);
  }

  otraFuncion(someStr: string){
    if (this.heroSearch.value) this.inputText = this.heroSearch.value;
    this.heroesService.getSuggestions(someStr)
    .subscribe( heroes => this.heroes = heroes)
  }
}
