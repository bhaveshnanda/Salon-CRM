import { Component, inject } from '@angular/core';

import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  fb = inject(FormBuilder);

  auth = inject(AuthService);

  router = inject(Router);

  form = this.fb.group({
    userid: ['', Validators.required],

    password: ['', Validators.required],
  });

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.auth.login(this.form.value).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);

        this.auth.saveUser(res.user);

        this.router.navigate(['/dashboard']);
      },

      error: (err: any) => {
        alert(err.error.message);
      },
    });
  }
}
