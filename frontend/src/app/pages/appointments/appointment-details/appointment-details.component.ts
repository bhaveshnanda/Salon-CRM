import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../core/services/appointment.service';
import { BillingService } from '../../../core/services/billing.service';

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
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
  shareWithClient(): void {
    const phone = this.formatPhoneForWhatsApp(this.appointment.phone);

    const message = `
Luxury Salon

Appointment Confirmed

Client: ${this.appointment.client_name}

Service: ${this.appointment.service}

Staff: ${this.appointment.staff_name}

Date: ${this.appointment.appointment_date}

Time: ${this.appointment.appointment_time}

Thank you for choosing Luxury Salon.
`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  }

  shareWithStaff(): void {
    const staffPhone = this.appointment.staff_phone || '';

    if (!staffPhone) {
      alert('Staff phone number not available');
      return;
    }

    const phone = this.formatPhoneForWhatsApp(staffPhone);

    const message = `
New Appointment Assigned

Client: ${this.appointment.client_name}

Phone: ${this.appointment.phone}

Service: ${this.appointment.service}

Date: ${this.appointment.appointment_date}

Time: ${this.appointment.appointment_time}

Please be available.
`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  }

  formatPhoneForWhatsApp(phone: string): string {
    if (!phone) {
      return '';
    }

    let cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 10) {
      cleaned = '91' + cleaned;
    }

    return cleaned;
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
