import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-inactive-page',
  templateUrl: './app-inactive-page.component.html',
  styleUrls: ['./app-inactive-page.component.scss']
})
export class InactivePageComponent implements OnInit {
  
  constructor(private authService: AuthenticationService,
    private router: Router) {  }

  ngOnInit() { }

  logout() {
    this.router.navigate(['/login']);
    this.authService.logout();
  }
}
