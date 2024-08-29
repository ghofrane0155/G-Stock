import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BonCommandeService } from '../../services/bon-commande.service';
import { BonCommande } from '../../models/bon-commande';
import Swal from 'sweetalert2';
import { FactureClient } from '../../models/factureClient';
import { FactureClientService } from '../../services/facture-client.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture-client.component.html',
  styleUrls: ['./facture-client.component.scss']
})
export class FactureClientComponent implements OnInit {
  facture: FactureClient = {
    idFactureClient: 0,
    bonCommande: {} as BonCommande,
    numeroFacture: 0,
    dateFactureClient: '',
    prixTotal: 0
  };
  bonCommandes: BonCommande[] = [];

  constructor(
    private factureService: FactureClientService,
    private bonCommandeService: BonCommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBonCommandes();
  }

  loadBonCommandes(): void {
    this.bonCommandeService.getAllBonCommandes().subscribe({
      next: (bonCommandes: BonCommande[]) => {
        this.bonCommandes = bonCommandes;
      },
      error: (err) => {
        console.error('Error loading bonCommandes', err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load bonCommandes. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  generateFacture(): void {
    if (!this.facture.bonCommande || !this.facture.bonCommande.idBonCommande) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a BonCommande.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.factureService.generateFacture(this.facture, this.facture.bonCommande.idBonCommande).subscribe({
      next: (generatedFacture) => {
        this.facture = generatedFacture;
        Swal.fire({
          title: 'Success!',
          text: 'Facture generated successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        console.error('Error generating Facture', err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to generate Facture. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
