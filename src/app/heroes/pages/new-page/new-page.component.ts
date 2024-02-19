import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``,
})
export class NewPageComponent implements OnInit{
  public urlHero?: Hero

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

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alter_img: new FormControl<string>(''),
  })

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
    .pipe(switchMap( ({id}) => this.heroesService.getHerobyId(id)))
    .subscribe( hero => {
      if(hero) {
        console.log(hero);

        this.heroForm.reset( hero ) }
      return
    })

  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
      .subscribe(hero => console.log(hero))
      return
    }

      this.heroesService.addHero(this.currentHero)
      .subscribe(hero => { console.log(hero)
      })
  }
}
