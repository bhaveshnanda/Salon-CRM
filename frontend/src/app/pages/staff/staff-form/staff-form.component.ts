import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StaffService } from '../../../core/services/staff.service';

@Component({
  selector: 'app-staff-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss'],
})
export class StaffFormComponent {
  private fb = inject(FormBuilder);

  private router = inject(Router);

  private staffService = inject(StaffService);

  form = this.fb.group({
    name: ['', Validators.required],

    phone: ['', Validators.required],

    email: [''],

    designation: ['', Validators.required],

    specialization: [''],

    salary: [0],

    status: ['Active'],
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.staffService.createStaff(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/staff']);
      },
    });
  }
}
