import { Client } from './client';
import { QuantiteCommande } from './quantite-commande';

export interface BonCommande {
  idBonCommande: number;
  dateCommande?: Date;
  listQtCommande: QuantiteCommande[];
  client: Client;
}
