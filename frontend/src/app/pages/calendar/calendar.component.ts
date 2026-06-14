import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FullCalendarModule } from '@fullcalendar/angular';

import { CalendarOptions } from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';

import timeGridPlugin from '@fullcalendar/timegrid';

import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',

    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],

    selectable: true,

    editable: true,

    height: 'auto',

    headerToolbar: {
      left: 'prev,next today',

      center: 'title',

      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },

    events: [
      {
        title: 'Hair Cut',
        start: '2026-06-14T09:00:00',
      },
      {
        title: 'Facial',
        start: '2026-06-14T11:00:00',
      },
    ],

    dateClick: (info: any) => {
      alert('Selected Slot: ' + info.dateStr);
    },
  };
}
