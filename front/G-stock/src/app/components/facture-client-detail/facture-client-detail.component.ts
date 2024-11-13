import { Component, OnInit } from '@angular/core';
import { FactureClient } from '../../models/factureClient';
import { FactureClientService } from '../../services/facture-client.service';
import { ActivatedRoute, Router } from '@angular/router';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-facture-client-detail',
  templateUrl: './facture-client-detail.component.html',
  styleUrl: './facture-client-detail.component.scss'
})
export class FactureClientDetailComponent implements OnInit {
  factureClient: FactureClient | null = null;

  constructor(
    private route: ActivatedRoute,
    private factureClientService: FactureClientService
  ) {}

  ngOnInit(): void {
    const factureClientId = this.route.snapshot.paramMap.get('id');  // Get the ID from the URL
    if (factureClientId) {
      this.loadFactureClient(+factureClientId);  // Convert to number
    }
  }

  loadFactureClient(id: number): void {
    this.factureClientService.getFactureClientById(id).subscribe((facture) => {
      this.factureClient = facture;
    });
  }

   // Generate PDF
   generatePDF(): void {
    const generateButton = document.getElementById('generatePdfButton');
    const backButton = document.getElementById('backButton');
    
    if (generateButton && backButton) {
      generateButton.classList.add('invisible');
      backButton.classList.add('invisible');
    }
  
    const data = document.getElementsByClassName('invoice-container')[0];
  
    html2canvas(data as HTMLElement).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('invoice.pdf');
  
      if (generateButton && backButton) {
        generateButton.classList.remove('invisible');
        backButton.classList.remove('invisible');
      }
    });
  }
  
  
  
}