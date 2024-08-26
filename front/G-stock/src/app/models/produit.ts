import { Category } from "./category";
import { Stock } from "./stock";

export interface Produit {
  idProduit?: number;
  nomProduit: string;
  description: string;
  prixUnitaire: number;
  codeAB?: string;
  logo?: string;
  quantite?: number; // New field
  categorie: Category; // Reference to the Categorie interface
  stock: Stock;

}
