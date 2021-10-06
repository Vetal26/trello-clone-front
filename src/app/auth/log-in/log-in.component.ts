import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  form!: FormGroup;
  boardService: any;
  returnURL: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.returnURL = params.returnURL;
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService.login(user).subscribe(
      (data) => {
        this.form.reset();
        this.router.navigate(['/boards']);
        if (this.route.queryParams) {
          this.router.navigate([this.returnURL]);
        }
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  getErrorMessageEmail() {
    if (this.form.get('email')?.hasError('required')) {
      return 'You must enter a email';
    }
    return this.form.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.form.get('password')?.hasError('required')) {
      return 'You must enter a password';
    }
    return this.form.get('password')?.hasError('minlength')
      ? `Minimum password length ${
          this.form.get('password')?.errors?.minlength.requiredLength
        } characters`
      : '';
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe(() => {});
  }
}
