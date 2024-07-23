import {  Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
    { path: 'sidebar', component: SidebarComponent },
    { path: 'view-profile', component: ViewProfileComponent },
    { path: 'account-settings', component: AccountSettingsComponent },
    // { path: '**', redirectTo: '/dashboard' } ,
];
