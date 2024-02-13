import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { MaterialModule } from '../material/material.module';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component'
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { CardComponent } from './components/card/card.component';
<<<<<<< HEAD
=======
import { CardImgPipe } from './pipes/card-img.pipe';
>>>>>>> parent of 2816dd6 (v2)



@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    HeroPageComponent,
<<<<<<< HEAD
    CardComponent
=======
    CardComponent,
    CardImgPipe
>>>>>>> parent of 2816dd6 (v2)
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MaterialModule,
  ]
})
export class HeroesModule { }
