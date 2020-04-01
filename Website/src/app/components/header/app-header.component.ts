import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class HeaderComponent {

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  get currentUserName() {
    return this.authService.currentUserValue.name;
  }

  get isAdmin() {
    return this.authService.isAdmin;
  }

  logout() {
    this.router.navigate(['/login']);
    this.authService.logout();
  }
}
