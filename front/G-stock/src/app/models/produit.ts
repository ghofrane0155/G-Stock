import { Category } from "./category";

export interface Produit {
  idProduit?: number;
  nomProduit: string;
  description: string;
  prixUnitaire: number;
  codeAB?: string;
  logo?: string;
  categorie?: Category; // Reference to the Categorie interface
}
