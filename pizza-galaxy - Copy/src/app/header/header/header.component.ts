import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  response: any;
  username: String = '';
  constructor(public auth: AuthService) {
    this.auth.user$.subscribe((res) => {
      this.response = res;
      this.username = this.response?.session.username;
    });
  }

  ngOnInit(): void {}
  logout() {
    this.auth.logout();
  }
}
