import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/appointments`;

  getAppointments() {
    return this.http.get(this.api);
  }

  getAppointment(id: string) {
    return this.http.get(`${this.api}/${id}`);
  }

  createAppointment(data: any) {
    return this.http.post(this.api, data);
  }

  updateAppointment(id: string, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  deleteAppointment(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }

  cancelAppointment(id: string) {
    return this.http.put(`${this.api}/cancel/${id}`, {});
  }

  rescheduleAppointment(id: string, data: any) {
    return this.http.put(`${this.api}/reschedule/${id}`, data);
  }
}
