import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``,
})
export class LayoutPageComponent {

  public sideNavItems = [
    {
      name: 'Listado',
      icon: 'list',
      rLink: 'list',
    },
    {
      name: 'Añadir',
      icon: 'add',
      rLink: 'new-hero',
    },
    {
      name: 'Buscar',
      icon: 'search',
      rLink: 'search',
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router) {}

  get user(): User | undefined{
    return this.authService.currentUser;
  }

  onLogout(): void {
    this.authService.logout()
    this.router.navigate(['/auth/login']);
  }
}
