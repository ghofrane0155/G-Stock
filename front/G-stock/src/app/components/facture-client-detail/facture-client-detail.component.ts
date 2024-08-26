import { Component, OnInit } from '@angular/core';
import { FactureClient } from '../../models/factureClient';
import { FactureClientService } from '../../services/facture-client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-facture-client-detail',
  templateUrl: './facture-client-detail.component.html',
  styleUrl: './facture-client-detail.component.scss'
})
export class FactureClientDetailComponent {//implements OnInit {
 /* factureClient: FactureClient = {
    dateFactureClient: '',
    prixTotal: 0,
    idFactureClient: 0,
  };

  constructor(
    private factureClientService: FactureClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.factureClientService.getFactureClientById(id).subscribe(
      (data) => this.factureClient = data,
      (error) => console.error('Error loading facture client', error)
    );
  }

  deleteFactureClient(): void {
   /* const id = this.route.snapshot.params['id'];
    this.factureClientService.deleteFactureClient(id).subscribe(
      () => this.router.navigate(['/facture-clients']),
      (error) => console.error('Error deleting facture client', error)
    );*/
 // }

}
