import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/services`;

  getServices(): Observable<any> {
    return this.http.get(this.api);
  }

  createService(data: any) {
    return this.http.post(this.api, data);
  }

  updateService(id: string, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  deleteService(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
