import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ServiceService } from '../../../core/services/service.service';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent implements OnInit {
  private serviceService = inject(ServiceService);

  services: any[] = [];

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe({
      next: (res: any) => {
        this.services = res;
      },

      error: (err: any) => {
        console.error('Error loading services', err);
      },
    });
  }

  deleteService(id: string): void {
    if (!confirm('Delete this service?')) {
      return;
    }

    this.serviceService.deleteService(id).subscribe({
      next: () => {
        this.loadServices();
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
