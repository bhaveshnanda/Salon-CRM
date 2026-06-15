import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/calendar`;

  getSchedule() {
    return this.http.get(this.api);
  }
}
