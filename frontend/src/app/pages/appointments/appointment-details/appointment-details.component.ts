import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../../core/services/appointment.service';
import { BillingService } from '../../../core/services/billing.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
})
export class AppointmentDetailsComponent implements OnInit {
  newDate = '';

  newTime = ''; 

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private appointmentService = inject(AppointmentService);

  private billingService = inject(BillingService);

  appointment: any = null;

  loading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadAppointment(id);
    }
  }

  loadAppointment(id: string): void {
    this.appointmentService.getAppointment(id).subscribe({
      next: (res: any) => {
        this.appointment = res;
        this.loading = false;
      },

      error: (err: any) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  rescheduleAppointment(): void {
    if (!this.newDate || !this.newTime) {
      alert('Select date and time');
      return;
    }

    this.appointmentService
      .rescheduleAppointment(this.appointment.id, {
        appointment_date: this.newDate,
        appointment_time: this.newTime,
      })
      .subscribe({
        next: () => {
          alert('Appointment Rescheduled');

          this.appointment.appointment_date = this.newDate;

          this.appointment.appointment_time = this.newTime;

          this.appointment.status = 'Rescheduled';
        },

        error: (err: any) => {
          console.error(err);
        },
      });
  }

  cancelAppointment(): void {
    if (!confirm('Cancel this appointment?')) {
      return;
    }

    this.appointmentService.cancelAppointment(this.appointment.id).subscribe({
      next: () => {
        alert('Appointment Cancelled');
        this.appointment.status = 'Cancelled';
      },
    });
  }

  generateBill(): void {
    this.billingService.generateBill(this.appointment.id).subscribe({
      next: (bill: any) => {
        this.router.navigate(['/billing/invoice', bill.id]);
      },
    });
  }
}
