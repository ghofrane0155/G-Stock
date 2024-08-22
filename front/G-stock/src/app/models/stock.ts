import { Produit } from './produit';

export interface Stock {
  idStock?: number;
  quantite: number;
  label: string;
  produits?: Produit[];  // Marking as optional since it may not always be needed
}
