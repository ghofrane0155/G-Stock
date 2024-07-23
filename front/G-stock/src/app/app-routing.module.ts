import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate-account',component: ActivateAccountComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'view-profile', component: ViewProfileComponent },
  { path: 'account-settings', component: AccountSettingsComponent },
  
  
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/dashboard' } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
