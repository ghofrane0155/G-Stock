import { Produit } from './produit';
import { BonCommande } from './bon-commande';

export interface QuantiteCommande {
  idQuantiteCommande: number;
  quantiteCommande: number;
  montant: number;
  produit: Produit;
  bonCommande: BonCommande | null; // or BonCommande if it can never be null
}
