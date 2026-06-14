export interface Appointment {
  id?: string;

  clientName: string;

  phone: string;

  staffName: string;

  service: string;

  price: number;

  date: string;

  time: string;

  notes?: string;

  status: string;
}
