import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

import { ClientListComponent } from './pages/clients/client-list/client-list.component';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';

import { AppointmentListComponent } from './pages/appointments/appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './pages/appointments/appointment-form/appointment-form.component';
import { AppointmentDetailsComponent } from './pages/appointments/appointment-details/appointment-details.component';

import { StaffListComponent } from './pages/staff/staff-list/staff-list.component';
import { StaffFormComponent } from './pages/staff/staff-form/staff-form.component';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

import { ServiceListComponent } from './pages/services/service-list/service-list.component';
import { ServiceFormComponent } from './pages/services/service-form/service-form.component';

import { BillListComponent } from './pages/billing/bill-list/bill-list.component';
import { InvoiceComponent } from './pages/billing/invoice/invoice.component';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Public Routes
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },

  // Protected Routes
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],

    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'services',
        component: ServiceListComponent,
      },
      {
        path: 'services/new',
        component: ServiceFormComponent,
      },
      {
        path: 'invoice/:id',
        component: InvoiceComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },

      {
        path: 'billing',
        component: BillListComponent,
      },

      {
        path: 'billing/invoice/:id',
        component: InvoiceComponent,
      },

      // APPOINTMENTS
      {
        path: 'appointments',
        component: AppointmentListComponent,
      },

      {
        path: 'appointments/new',
        component: AppointmentFormComponent,
      },
      {
        path: 'appointments/edit/:id',
        component: AppointmentFormComponent,
      },

      {
        path: 'appointments/:id',
        component: AppointmentDetailsComponent,
      },

      // CLIENTS
      {
        path: 'clients',
        component: ClientListComponent,
      },

      {
        path: 'clients/new',
        component: ClientFormComponent,
      },

      // STAFF
      {
        path: 'staff',
        component: StaffListComponent,
      },

      {
        path: 'staff/new',
        component: StaffFormComponent,
      },

      // DEFAULT
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },

  // Fallback
  {
    path: '**',
    redirectTo: 'login',
  },
];
