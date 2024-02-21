import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { map, of, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``,
})
export class NewPageComponent implements OnInit {
  public urlHero?: Hero;

  public areYouSure: boolean = false;

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
    },
  ];

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alter_img: new FormControl<string>(''),
  });

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHerobyId(id)))
      .subscribe((hero) => {
        if (hero) {
          // console.log(hero); //CONSOLE LOG
          this.heroForm.reset(hero);
        }
        return;
      });
  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe((hero) => {
        this.showSnackbar(`${hero.superhero} updated!`);
        this.router.navigate([`heroes/edit/${this.currentHero.id}`]);
        console.log(hero);
      });
      return;
    }

    this.heroesService.addHero(this.currentHero).subscribe((hero) => {
      this.showSnackbar(`${hero.superhero} added!`);
      this.router.navigate(['heroes/list']);
      console.log(hero);
    });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(DeleteDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (!result) return of(false);

          this.router.navigate(['heroes/list']);
          this.showSnackbar(`${this.currentHero.superhero} deleted!`);
          return this.heroesService.deleteHeroById(this.currentHero);
        })
      )
      .subscribe();
  }
}
