import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private api: PizzaService, private router: Router) {}

  signupForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  get username() {
    return this.signupForm.get('username')?.value;
  }
  get password() {
    return this.signupForm.get('password')?.value;
  }

  ngOnInit() {}
  signup() {
    const user: User = { username: this.username, password: this.password };
    this.signupForm.reset();

    this.api.createUser(user).subscribe();
    this.router.navigateByUrl('/login');
  }
}
