import { Component, inject } from '@angular/core';

import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { AppointmentService } from '../../../core/services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
})
export class AppointmentFormComponent {
  fb = inject(FormBuilder);

  appointmentService = inject(AppointmentService);

  router = inject(Router);

  services = [
    {
      name: 'Hair Cut',
      price: 500,
    },

    {
      name: 'Hair Spa',
      price: 1500,
    },

    {
      name: 'Facial',
      price: 1200,
    },
  ];

  form = this.fb.group({
    clientName: ['', Validators.required],

    phone: ['', Validators.required],

    staffName: ['', Validators.required],

    service: ['', Validators.required],

    price: [0],

    date: ['', Validators.required],

    time: ['', Validators.required],

    notes: [''],
  });

  updatePrice() {
    const service = this.services.find(
      (x) => x.name === this.form.value.service,
    );

    if (service) {
      this.form.patchValue({
        price: service.price,
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.appointmentService
      .createAppointment({
        ...this.form.value,

        status: 'Booked',
      } as any)
      .subscribe({
        next: () => {
          this.router.navigate(['/appointments']);
        },
      });

    alert('Appointment Booked');

    this.router.navigate(['/appointments']);
  }
}
