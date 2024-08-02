/* tslint:disable */
/* eslint-disable */
import { Categorie } from '../models/categorie';
export interface Produit {
  categorie?: Categorie;
  codeAB?: string;
  description?: string;
  idProduit?: number;
  logo?: string;
  nomProduit?: string;
  prixUnitaire?: number;
}
