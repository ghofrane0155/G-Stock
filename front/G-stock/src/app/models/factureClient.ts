import { BonCommande } from "./bon-commande";

export interface FactureClient {
  idFactureClient: number;
  dateFactureClient: Date;
  prixTotal: number;
  bonCommande: BonCommande;
}
