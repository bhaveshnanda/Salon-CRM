import { Component, inject } from '@angular/core';

import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  fb = inject(FormBuilder);

  http = inject(HttpClient);

  router = inject(Router);

  form = this.fb.group({
    name: ['', Validators.required],

    userid: ['', Validators.required],

    email: [''],

    phone: [''],

    password: ['', Validators.required],
  });

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.http
      .post('http://localhost:5000/api/auth/register', this.form.value)
      .subscribe({
        next: () => {
          alert('Account Created');

          this.router.navigate(['/login']);
        },

        error: (err) => {
          alert(err.error.message);
        },
      });
  }
}
