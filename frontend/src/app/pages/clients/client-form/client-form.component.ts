import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../core/services/client.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent {
  fb = inject(FormBuilder);

  router = inject(Router);

  clientService = inject(ClientService);

  form = this.fb.group({
    name: ['', Validators.required],

    phone: ['', Validators.required],

    email: [''],
  });

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.clientService.createClient(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/clients']);
      },
    });
  }
}
