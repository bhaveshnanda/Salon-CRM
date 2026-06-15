import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   // <-- Add this
import { Router } from '@angular/router';
import { CalendarService } from '../../core/services/calendar.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],   // <-- Add FormsModule here
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})

export class CalendarComponent implements OnInit {
  private calendarService = inject(CalendarService);

  private router = inject(Router);

  staff: any[] = [];

  appointments: any[] = [];

  slots = [
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

  selectedDate = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.calendarService.getSchedule().subscribe({
      next: (res: any) => {
        this.staff = res.staff;

        this.appointments = res.appointments;
      },
    });
  }

  getAppointment(staffId: string, time: string) {
    return this.appointments.find((a) => {
      return (
        a.staff_id === staffId &&
        a.appointment_time === time &&
        a.appointment_date === this.selectedDate
      );
    });
  }

  bookSlot(staff: any, time: string) {
    this.router.navigate(['/appointments/new'], {
      queryParams: {
        staffId: staff.id,
        date: this.selectedDate,
        time: time,
      },
    });
  }
}
