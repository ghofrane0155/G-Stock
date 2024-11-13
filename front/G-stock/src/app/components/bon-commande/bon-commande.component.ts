import { Component, OnInit } from '@angular/core';
import { BonCommandeService } from '../../services/bon-commande.service';
import { ProduitService } from '../../services/produit.service';
import { ClientService } from '../../services/client.service';
import { BonCommande } from '../../models/bon-commande';
import { Produit } from '../../models/produit';
import { Client } from '../../models/client';
import Swal from 'sweetalert2';
import { FactureClientService } from '../../services/facture-client.service';
import { FactureClient } from '../../models/factureClient';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-bon-commande',
  templateUrl: './bon-commande.component.html',
  styleUrls: ['./bon-commande.component.scss']
})
export class BonCommandeComponent implements OnInit {
  bonCommande: BonCommande = {
    idBonCommande: 0,
    listQtCommande: [],
    client: {} as Client
  };
  clients: Client[] = [];
  produits: Produit[] = [];

  bonCommandes: BonCommande[] = []; // Array to hold all BonCommandes
  paginatedBonCommandes: BonCommande[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(
    private bonCommandeService: BonCommandeService,
    private produitService: ProduitService,
    private clientService: ClientService,
    private factureService: FactureClientService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadProduits();
    this.loadBonCommandes(); // Load BonCommandes on init
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (clients: Client[]) => {
        this.clients = clients;
      },
      error: (err) => {
        console.error('Error loading clients', err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load clients. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (produits: Produit[]) => {
        this.produits = produits;
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    });
  }

  // Add a new product row
  addProduct(): void {
    this.bonCommande.listQtCommande.push({
      produit: {} as Produit,  // A new empty product object
      quantiteCommande: 0,      // Default quantity
      montant: 0,               // Default montant (can be calculated later)
      idQuantiteCommande: 0,    // Assuming this is the default value for a new record
      bonCommande: this.bonCommande  // Attach the current BonCommande object to this QuantiteCommande
    });
  }

  // Remove a product row
  removeProduct(index: number): void {
    this.bonCommande.listQtCommande.splice(index, 1);
  }

  // Submit the BonCommande with selected products and quantities
  submit(): void {
    if (!this.bonCommande.client || !this.bonCommande.client.idClient) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a client.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
  
    // Prepare the data without circular reference
    const bonCommandeToSend = {
      ...this.bonCommande,
      listQtCommande: this.bonCommande.listQtCommande.map(qt => ({
        produit: qt.produit,
        quantiteCommande: qt.quantiteCommande,
        montant: qt.montant,
        idQuantiteCommande: 0, // Default value for new entries
        bonCommande: { ...this.bonCommande, listQtCommande: [] } // Create a placeholder BonCommande
      }))
    };
  
    this.bonCommandeService.addBonCommande(bonCommandeToSend, this.bonCommande.client.idClient).subscribe({
      next: (createdBonCommande) => {
        // Update the bonCommandes array
        this.bonCommandes.push(createdBonCommande);
        // Refresh the pagination to display the new entry
        this.totalPages = Math.ceil(this.bonCommandes.length / this.itemsPerPage);
        this.updatePagination();
  
        // Reset the form after submission
        this.bonCommande = {
          idBonCommande: 0,
          listQtCommande: [],
          client: {} as Client
        };
  
        Swal.fire({
          title: 'Success!',
          text: 'BonCommande created successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },  
      error: (err) => {
        console.error('Error creating BonCommande', err);
        Swal.fire({
          title: 'Error!',
          text: err.error.error,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
  
/******** List of Bon Commandes ***********************/
loadBonCommandes(): void {
  this.bonCommandeService.getAllBonCommandes().subscribe({
    next: (data: BonCommande[]) => {
      this.bonCommandes = data;
      this.totalPages = Math.ceil(this.bonCommandes.length / this.itemsPerPage);
      this.updatePagination();

      this.bonCommandes.forEach(bonCommande => {
        this.isFactureGenerated(bonCommande.idBonCommande);
      });
    },
    error: (err) => console.error('Failed to load Bon Commandes', err),
  });
}
filterBonCommandes(): void {
  const filtered = this.bonCommandes.filter(bc =>
    bc.client.nomClient.includes(this.searchTerm) ||
    bc.idBonCommande.toString().includes(this.searchTerm)
  );
  this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
  this.paginatedBonCommandes = filtered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
}

updatePagination(): void {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = this.currentPage * this.itemsPerPage;
  this.paginatedBonCommandes = this.bonCommandes.slice(start, end);
}

changePage(page: number): void {
  this.currentPage = page;
  this.updatePagination();
}

isActivePage(page: number): boolean {
  return this.currentPage === page;
}
/**************************************** */
facture: FactureClient = {
  idFactureClient: 0,
  bonCommande: {} as BonCommande,
  numeroFacture: 0,
  dateFactureClient: '',
  prixTotal: 0
}; 
generateFacture(idBonCommande: number): void {
  // Call your service to generate the facture
      Swal.fire({
        title: 'Success!',
        text: 'Facture generated successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Navigate to factureClients after user acknowledges the alert
        this.router.navigate(['/factureClients']);
      });
}

factureGenerated: { [key: number]: boolean } = {}; // Initialize a map to track facture generation status
isFactureGenerated(bonCommandeId: number): void {
  this.factureService.getFactureByBonCommandeId(bonCommandeId).subscribe({
    next: (facture) => {
      this.factureGenerated[bonCommandeId] = !!facture; // Store result in a map or array
    },
    error: () => {
      this.factureGenerated[bonCommandeId] = false; // Set to false on error
    }
  });
}


}