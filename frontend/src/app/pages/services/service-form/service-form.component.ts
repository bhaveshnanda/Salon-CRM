import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ServiceService } from '../../../core/services/service.service';

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
})
export class ServiceFormComponent {
  private fb = inject(FormBuilder);

  private router = inject(Router);

  private serviceService = inject(ServiceService);

  form = this.fb.group({
    name: ['', Validators.required],

    description: [''],

    duration_minutes: [30, Validators.required],

    price: [0, Validators.required],

    status: ['Active'],
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.serviceService.createService(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/services']);
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
