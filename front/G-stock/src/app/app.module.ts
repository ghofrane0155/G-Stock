import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { CodeInputModule } from 'angular-code-input';
import { UsersComponent } from './components/users/users.component';
import { ClientsComponent } from './components/clients/clients.component';
import { FournisseursComponent } from './components/fournisseurs/fournisseurs.component';
import { CommonModule } from '@angular/common';
import { ProduitComponent } from './components/produit/produit.component';
import { CategoryComponent } from './components/category/category.component';
import { StockComponent } from './components/stock/stock.component';
import { FactureClientListComponent } from './components/facture-client-list/facture-client-list.component';
import { FactureClientDetailComponent } from './components/facture-client-detail/facture-client-detail.component';
import { BonCommandeComponent } from './components/bon-commande/bon-commande.component';
import { QuantiteCommandeComponent } from './components/quantite-commande/quantite-commande.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountSettingsComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ViewProfileComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    UsersComponent,
    ClientsComponent,
    FournisseursComponent,
    ProduitComponent,
    CategoryComponent,
    StockComponent,
    FactureClientListComponent,
    FactureClientDetailComponent,
    BonCommandeComponent,
    QuantiteCommandeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    RouterOutlet,
    HttpClientModule,
    CodeInputModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
