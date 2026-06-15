import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { StaffService } from '../../core/services/staff.service';
import { AppointmentService } from '../../core/services/appointment.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  private staffService = inject(StaffService);
  private appointmentService = inject(AppointmentService);
  private router = inject(Router);

  staff: any[] = [];
  appointments: any[] = [];

  selectedDate = new Date().toISOString().split('T')[0];

  timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  ngOnInit(): void {
    this.loadCalendarData();
  }

  loadCalendarData(): void {
    this.staffService.getStaff().subscribe({
      next: (res: any) => {
        this.staff = res.data || res;
      },
      error: (err: any) => {
        console.error('Staff loading failed', err);
      },
    });

    this.appointmentService.getAppointments().subscribe({
      next: (res: any) => {
        this.appointments = res.data || res;
      },
      error: (err: any) => {
        console.error('Appointment loading failed', err);
      },
    });
  }

  onDateChange(): void {
    this.loadCalendarData();
  }

  getBooking(staffId: string, time: string): any {
    return this.appointments.find((appointment) => {
      return (
        appointment.staff_id === staffId &&
        appointment.appointment_date === this.selectedDate &&
        appointment.appointment_time === time &&
        appointment.status !== 'Cancelled'
      );
    });
  }

  selectAvailableSlot(staffMember: any, time: string): void {
    this.router.navigate(['/appointments/new'], {
      queryParams: {
        staffId: staffMember.id,
        date: this.selectedDate,
        time: time,
      },
    });
  }

  openBookingDetails(id: string): void {
    this.router.navigate(['/appointments', id]);
  }
}
