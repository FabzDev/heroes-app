import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
public sideNavItems = [
  {
    name: 'Listado',
    icon: 'list',
    rLink: 'list'
  },
  {
    name: 'Añadir',
    icon: 'add',
    rLink: 'new-hero'
  },
  {
    name: 'Buscar',
    icon: 'search',
    rLink: 'search'
  }
]
}
