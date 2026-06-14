import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/staff`;

  getStaff(): Observable<any> {
    return this.http.get(this.api);
  }

  createStaff(data: any) {
    return this.http.post(this.api, data);
  }

  updateStaff(id: string, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  deleteStaff(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
