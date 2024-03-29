import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``,
})
export class HeroPageComponent implements OnInit {
  public hero!: Hero;

  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHerobyId(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigate(['/heroes/list']);
        console.log(hero);

        this.hero = hero;
        return;
      });
  }

  goBack(){
    this.router.navigate(['/heroes'])
  }
}
