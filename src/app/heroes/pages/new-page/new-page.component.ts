import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { Hero, Publisher } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``,
})
export class NewPageComponent {
  public creadores = [
    {
      name: 'DC Comics',
      display: 'DC - Comics',
    },
    {
      name: 'Marvel Comics',
      display: 'Marvel - Comics',
    },
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

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

  }
}
