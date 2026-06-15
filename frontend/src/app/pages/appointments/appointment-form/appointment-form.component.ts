import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AppointmentService } from '../../../core/services/appointment.service';
import { ClientService } from '../../../core/services/client.service';
import { StaffService } from '../../../core/services/staff.service';
import { ServiceService } from '../../../core/services/service.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
})
export class AppointmentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private appointmentService = inject(AppointmentService);
  private clientService = inject(ClientService);
  private staffService = inject(StaffService);
  private serviceService = inject(ServiceService);

  clients: any[] = [];
  staff: any[] = [];
  services: any[] = [];

  loading = false;
  isEditMode = false;
  appointmentId: string | null = null;

  form = this.fb.group({
    client_id: ['', Validators.required],
    staff_id: ['', Validators.required],
    service_id: ['', Validators.required],

    client_name: [''],
    phone: [''],
    staff_name: [''],
    service: [''],
    price: [0],

    appointment_date: ['', Validators.required],
    appointment_time: ['', Validators.required],
    notes: [''],
    status: ['Booked'],
  });

  ngOnInit(): void {
    this.appointmentId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.appointmentId;

    this.loadClients();
    this.loadStaff();
    this.loadServices();

    if (this.isEditMode && this.appointmentId) {
      this.loadAppointment(this.appointmentId);
    } else {
      this.form.patchValue({
        appointment_date: this.route.snapshot.queryParamMap.get('date') || '',

        appointment_time: this.route.snapshot.queryParamMap.get('time') || '',
      });
    }
  }

  loadAppointment(id: string): void {
    this.appointmentService.getAppointment(id).subscribe({
      next: (res: any) => {
        this.form.patchValue({
          client_id: res.client_id,
          staff_id: res.staff_id,
          service_id: res.service_id,

          client_name: res.client_name,
          phone: res.phone,
          staff_name: res.staff_name,
          service: res.service,
          price: res.price,

          appointment_date: res.appointment_date,
          appointment_time: res.appointment_time,
          notes: res.notes,
          status: res.status,
        });
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  loadClients(): void {
    this.clientService.getClients().subscribe((res: any) => {
      this.clients = res.data || res;
    });
  }

  loadStaff(): void {
    this.staffService.getStaff().subscribe((res: any) => {
      this.staff = res.data || res;

      const staffId = this.route.snapshot.queryParamMap.get('staffId');

      if (!this.isEditMode && staffId) {
        const selectedStaff = this.staff.find((s) => s.id === staffId);

        if (selectedStaff) {
          this.form.patchValue({
            staff_id: selectedStaff.id,
            staff_name: selectedStaff.name,
          });
        }
      }
    });
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe((res: any) => {
      this.services = res.data || res;
    });
  }

  onClientChange(): void {
    const client = this.clients.find((c) => c.id === this.form.value.client_id);

    if (!client) return;

    this.form.patchValue({
      client_name: client.name,
      phone: client.phone,
    });
  }

  onStaffChange(): void {
    const staff = this.staff.find((s) => s.id === this.form.value.staff_id);

    if (!staff) return;

    this.form.patchValue({
      staff_name: staff.name,
    });
  }

  onServiceChange(): void {
    const service = this.services.find(
      (s) => s.id === this.form.value.service_id,
    );

    if (!service) return;

    this.form.patchValue({
      service: service.name,
      price: service.price,
    });
  }

  submit(): void {
    if (this.form.invalid) {
      alert('Please fill all required fields');
      return;
    }

    this.loading = true;

    if (this.isEditMode && this.appointmentId) {
      this.appointmentService
        .updateAppointment(this.appointmentId, this.form.value)
        .subscribe({
          next: () => {
            alert('Appointment Updated Successfully');
            this.router.navigate(['/appointments']);
          },
          error: (err: any) => {
            alert(err?.error?.message || 'Unable to update appointment');
            this.loading = false;
          },
        });

      return;
    }

    this.appointmentService.createAppointment(this.form.value).subscribe({
      next: () => {
        alert('Appointment Booked Successfully');
        this.router.navigate(['/appointments']);
      },
      error: (err: any) => {
        alert(err?.error?.message || 'Unable to create appointment');
        this.loading = false;
      },
    });
  }
}
