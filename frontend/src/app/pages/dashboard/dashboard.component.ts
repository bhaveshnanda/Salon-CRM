import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  stats: any = {
    clients: 0,
    staff: 0,
    appointments: 0,
    todaysAppointments: 0,
    totalRevenue: 0,
    pendingPayments: 0,
  };

  loading = true;

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.dashboardService.getStats().subscribe({
      next: (res: any) => {
        this.stats = res;
        this.loading = false;
      },

      error: (err: any) => {
        console.error('Dashboard Error', err);
        this.loading = false;
      },
    });
  }
}
