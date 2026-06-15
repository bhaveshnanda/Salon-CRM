import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { AppointmentService } from '../../../core/services/appointment.service';

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
})
export class AppointmentDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);

  private appointmentService = inject(AppointmentService);

  appointment: any = null;

  loading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.appointmentService.getAppointment(id).subscribe({
        next: (res: any) => {
          this.appointment = res.data || res;

          this.loading = false;
        },

        error: (err) => {
          console.error(err);

          this.loading = false;
        },
      });
    }
  }
}
