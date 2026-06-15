import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

import { BillingService } from '../../../core/services/billing.service';

@Component({
  selector: 'app-bill-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss'],
})
export class BillListComponent implements OnInit {
  private billingService = inject(BillingService);

  bills: any[] = [];

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills() {
    this.billingService.getBills().subscribe({
      next: (res: any) => {
        this.bills = res;
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}
