import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { MisContactosComponent } from './mis-contactos/mis-contactos.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { loginGuard } from './shared/guards/login.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'login', component: LoginComponent }, 
    //{ path: 'login', loadChildren: () => import('./login/routes').then(mod => mod.routes), canMatch: [loginRedirectGuard] },
    { path: 'register', component: RegisterComponent }, 
    //{ path: 'contacts', loadChildren: () => import('./contacts/routes').then(mod => mod.routes), canMatch: [loginGuard] },
    { path: 'contacts', component: MisContactosComponent }, 
    { path: 'contacts/edit/:id', component: ContactEditComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'welcome/:message2', component: WelcomeComponent },
    { path: 'addcontacts', component: AddContactComponent },
    { path: '**', redirectTo: '/login' } 
];
