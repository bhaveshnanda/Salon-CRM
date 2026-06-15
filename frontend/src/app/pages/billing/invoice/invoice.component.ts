import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BillingService } from '../../../core/services/billing.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  private route = inject(ActivatedRoute);

  private billingService = inject(BillingService);

  bill: any = null;

  loading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.billingService.getBill(id).subscribe({
        next: (res: any) => {
          this.bill = res;

          this.loading = false;
        },

        error: (err: any) => {
          console.error(err);

          this.loading = false;
        },
      });
    }
  }

  printInvoice() {
    window.print();
  }

  shareInvoice() {
    const text = `
Invoice: ${this.bill.invoice_no}

Client: ${this.bill.client_name}

Service: ${this.bill.service_name}

Total Amount: ₹${this.bill.total}
`;

    if (navigator.share) {
      navigator.share({
        title: 'Salon Invoice',
        text,
      });
    } else {
      navigator.clipboard.writeText(text);

      alert('Invoice copied to clipboard');
    }
  }

  markPaid(method: string): void {
    this.billingService.markAsPaid(this.bill.id, method).subscribe({
      next: (res: any) => {
        this.bill = res;

        alert('Payment Updated Successfully');
      },

      error: (err: any) => {
        console.error(err);

        alert('Failed to update payment');
      },
    });
  }

  downloadPDF() {
    const data = document.getElementById('invoice-print-area');

    if (!data) return;

    const hiddenElements = document.querySelectorAll('.no-pdf');

    hiddenElements.forEach((el: any) => {
      el.setAttribute('data-old-display', el.style.display);
      el.style.display = 'none';
    });

    setTimeout(() => {
      html2canvas(data, {
        scale: 2,
        useCORS: true,
      }).then((canvas) => {
        hiddenElements.forEach((el: any) => {
          el.style.display = el.getAttribute('data-old-display') || '';
        });

        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgData = canvas.toDataURL('image/png');

        const imgWidth = 210;

        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        pdf.save(`${this.bill.invoice_no}.pdf`);
      });
    }, 200);
  }
}
