import { Produit } from "./produit";

export interface Category {
  idCategorie?: number;
  nomCategorie?: string;
  produits?: Produit[]; // Optional array of produits associated with this category
}
