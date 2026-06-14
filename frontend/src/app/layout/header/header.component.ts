import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userName = 'Admin';

  constructor(private router: Router) {
    const user = localStorage.getItem('user');

    if (user) {
      this.userName = JSON.parse(user).name;
    }
  }

  logout() {
    localStorage.clear();

    this.router.navigate(['/login']);
  }
}
