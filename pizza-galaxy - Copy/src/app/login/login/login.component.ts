import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  get username() {
    return this.loginForm.get('username')?.value;
  }
  get password() {
    return this.loginForm.get('password')?.value;
  }

  ngOnInit() {}
  login() {
    this.auth
      .login({ username: this.username, password: this.password })
      .subscribe(
        () => {
          console.log('login Successful');

          this.router.navigateByUrl('/');
        },
        (err) => {
          console.log('Login failed');
        }
      );
  }
}
