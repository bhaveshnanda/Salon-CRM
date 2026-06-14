import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AppointmentService } from '../../../core/services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
  private appointmentService = inject(AppointmentService);

  appointments: any[] = [];

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (res: any) => {
        this.appointments = res.data || res;
      },

      error: (err: any) => {
        console.error('Error loading appointments', err);
      },
    });
  }

  deleteAppointment(id: string): void {
    if (!confirm('Are you sure you want to delete this appointment?')) {
      return;
    }

    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => {
        this.loadAppointments();
      },

      error: (err: any) => {
        console.error('Delete failed', err);
      },
    });
  }
}
