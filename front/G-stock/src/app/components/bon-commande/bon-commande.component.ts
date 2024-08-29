import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BonCommandeService } from '../../services/bon-commande.service';
import { ClientService } from '../../services/client.service';
import { BonCommande } from '../../models/bon-commande';
import { Client } from '../../models/client';
import Swal from 'sweetalert2';

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

  constructor(
    private bonCommandeService: BonCommandeService,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
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

  createBonCommande(): void {
    if (!this.bonCommande.client || !this.bonCommande.client.idClient) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a client.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
  
    this.bonCommandeService.addBonCommande(this.bonCommande, this.bonCommande.client.idClient).subscribe({
      next: (createdBonCommande) => {
        this.bonCommande = createdBonCommande;
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
          text: 'Failed to create BonCommande. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }  

  navigateToQuantiteCommande(): void {
    this.router.navigate(['/quantite-commande']);
  }
}
