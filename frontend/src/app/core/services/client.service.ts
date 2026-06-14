import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/clients`;

  getClients(): Observable<any> {
    return this.http.get(this.api);
  }

  getClient(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  createClient(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  updateClient(id: string, data: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, data);
  }

  deleteClient(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
