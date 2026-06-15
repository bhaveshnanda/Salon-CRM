import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AppointmentService } from '../../../core/services/appointment.service';
import { BillingService } from '../../../core/services/billing.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
  private appointmentService = inject(AppointmentService);

  private billingService = inject(BillingService);

  private router = inject(Router);

  appointments: any[] = [];

  loading = false;

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;

    this.appointmentService.getAppointments().subscribe({
      next: (res: any) => {
        this.appointments = res.data || res;

        this.loading = false;
      },

      error: (err: any) => {
        console.error(err);

        this.loading = false;
      },
    });
  }

  deleteAppointment(id: string): void {
    if (!confirm('Delete this appointment?')) {
      return;
    }

    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => {
        alert('Appointment Deleted');

        this.loadAppointments();
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }

  cancelAppointment(id: string): void {
    if (!confirm('Cancel this appointment?')) {
      return;
    }

    this.appointmentService.cancelAppointment(id).subscribe({
      next: () => {
        alert('Appointment Cancelled');

        this.loadAppointments();
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }

  generateBill(id: string): void {
    this.billingService.generateBill(id).subscribe({
      next: (bill: any) => {
        alert('Invoice Generated Successfully');

        this.router.navigate(['/invoice', bill.id]);
      },

      error: (err: any) => {
        console.error(err);

        alert('Failed to generate invoice');
      },
    });
  }
}
