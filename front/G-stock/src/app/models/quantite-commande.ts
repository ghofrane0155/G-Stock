import { Produit } from './produit';
import { BonCommande } from './bon-commande';

export interface QuantiteCommande {
  idQuantiteCommande: number;
  quantiteCommande: number;
  montant: number;
  produit: Produit;
  bonCommande: BonCommande;
}
