import {  Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
    { path: 'base', component: SidebarComponent },
    { path: 'sidebar', component: SidebarComponent }
];