import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { UsersComponent } from './components/users/users.component';
import { ClientsComponent } from './components/clients/clients.component';
import { FournisseursComponent } from './components/fournisseurs/fournisseurs.component';
import { ProduitComponent } from './components/produit/produit.component';
import { CategoryComponent } from './components/category/category.component';
import { StockComponent } from './components/stock/stock.component';
import { AuthGuard } from './auth/auth.guard';
import { FactureClientListComponent } from './components/facture-client-list/facture-client-list.component';
import { FactureClientDetailComponent } from './components/facture-client-detail/facture-client-detail.component';
import { QuantiteCommandeComponent } from './components/quantite-commande/quantite-commande.component';
import { BonCommandeComponent } from './components/bon-commande/bon-commande.component';
import { FactureClientComponent } from './components/facture-client/facture-client.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect root to dashboard

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate-account', component: ActivateAccountComponent },

  // Unprotected routes (AuthGuard removed)
  { path: 'view-profile', component: ViewProfileComponent , canActivate: [AuthGuard] },
  { path: 'account-settings', component: AccountSettingsComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent , canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent , canActivate: [AuthGuard] },
  { path: 'fournisseurs', component: FournisseursComponent, canActivate: [AuthGuard] },
  { path: 'produit', component: ProduitComponent , canActivate: [AuthGuard] },
  { path: 'category', component: CategoryComponent , canActivate: [AuthGuard] },
  { path: 'stock', component: StockComponent , canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'sidebar', component: SidebarComponent , canActivate: [AuthGuard] },
  { path: 'factureClients', component: FactureClientListComponent, canActivate: [AuthGuard] },
  { path: 'factureClient/:id', component: FactureClientDetailComponent, canActivate: [AuthGuard] },
  
  { path: 'boncommande', component: BonCommandeComponent, canActivate: [AuthGuard] },
  { path: 'facture', component: FactureClientComponent, canActivate: [AuthGuard] },
  { path: 'quantite-commande', component: QuantiteCommandeComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
