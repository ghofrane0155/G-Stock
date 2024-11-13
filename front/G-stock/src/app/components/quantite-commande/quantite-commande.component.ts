import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuantiteCommandeService } from '../../services/quantite-commande.service';
import { ProduitService } from '../../services/produit.service';
import { BonCommandeService } from '../../services/bon-commande.service';
import { Produit } from '../../models/produit';
import { BonCommande } from '../../models/bon-commande';
import { QuantiteCommande } from '../../models/quantite-commande';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quantite-commande',
  templateUrl: './quantite-commande.component.html',
  styleUrls: ['./quantite-commande.component.scss']
})
export class QuantiteCommandeComponent implements OnInit {
  @Input() bonCommandeId!: number;
  quantiteCommande: QuantiteCommande = {
    idQuantiteCommande: 0,
    quantiteCommande: 0,
    montant: 0,
    produit: {} as Produit,
    bonCommande: {} as BonCommande
  };
  produits: Produit[] = [];
  bonCommandes: BonCommande[] = [];

  constructor(
    private quantiteCommandeService: QuantiteCommandeService,
    private produitService: ProduitService,
    private bonCommandeService: BonCommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProduits();
    this.loadBonCommandes();
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (produits: Produit[]) => {
        this.produits = produits;
      },
      error: (err) => {
        console.error('Error loading produits', err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load produits. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
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

  addQuantiteCommande(): void {
    if (!this.quantiteCommande.produit || !this.quantiteCommande.produit.idProduit) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a product.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (!this.quantiteCommande.bonCommande || !this.quantiteCommande.bonCommande.idBonCommande) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a BonCommande.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.quantiteCommandeService.addQuantiteCommande(this.quantiteCommande, this.quantiteCommande.produit.idProduit, this.quantiteCommande.bonCommande.idBonCommande).subscribe({
      next: (createdQuantiteCommande) => {
        this.quantiteCommande = createdQuantiteCommande;
        Swal.fire({
          title: 'Success!',
          text: 'QuantiteCommande added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        console.error('Error adding QuantiteCommande', err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add QuantiteCommande. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  navigateToFacture(): void {
    this.router.navigate(['/facture']);
  }
}
