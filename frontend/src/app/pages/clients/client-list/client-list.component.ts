import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ClientService } from '../../../core/services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  private clientService = inject(ClientService);

  clients: any[] = [];

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (res: any) => {
        this.clients = res.data || res;
      },

      error: (err: any) => {
        console.error('Error loading clients', err);
      },
    });
  }

  deleteClient(id: string): void {
    if (!confirm('Are you sure you want to delete this client?')) {
      return;
    }

    this.clientService.deleteClient(id).subscribe({
      next: () => {
        this.loadClients();
      },

      error: (err: any) => {
        console.error('Delete failed', err);
      },
    });
  }
}
