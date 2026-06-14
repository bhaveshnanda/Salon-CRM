import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { StaffService } from '../../../core/services/staff.service';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements OnInit {
  private staffService = inject(StaffService);

  staff: any[] = [];

  ngOnInit(): void {
    this.loadStaff();
  }

  loadStaff(): void {
    this.staffService.getStaff().subscribe({
      next: (res: any) => {
        this.staff = res.data || res;
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }

  deleteStaff(id: string): void {
    if (!confirm('Delete this staff member?')) {
      return;
    }

    this.staffService.deleteStaff(id).subscribe({
      next: () => {
        this.loadStaff();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
