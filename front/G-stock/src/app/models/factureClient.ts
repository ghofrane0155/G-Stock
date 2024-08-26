import { BonCommande } from "./bon-commande";

export interface FactureClient {
  idFactureClient: number;
  numeroFacture: number;
  dateFactureClient: string;
  prixTotal: number;
  bonCommande: BonCommande;
}
