import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/billing`;

  getBills() {
    return this.http.get(this.api);
  }

  getBill(id: string) {
    return this.http.get(`${this.api}/${id}`);
  }

  generateBill(id: string) {
    return this.http.post(`${this.api}/generate/${id}`, {});
  }
}
