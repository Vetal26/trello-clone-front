import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authService.signup(user).subscribe(() => {
      if (this.authService.isAuthenticated()) {
        this.form.reset()
        this.router.navigate(['/boards'])
      }
    })
  }

}
