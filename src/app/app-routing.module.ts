import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PersonListComponent } from './pages/person-list/person-list.component';
import { AppAuthGuard } from './guard/app.auth.guard';
import { PersonCreateComponent } from './pages/person-create/person-create.component';
import { AppRoles } from 'src/app.roles';
import { ContactDetailsListComponent } from './pages/contact-details-list/contact-details-list.component';
import { ContactDetailsCreateComponent } from './pages/contact-details-create/contact-details-create.component';
import { CountryListComponent } from './pages/country-list/country-list.component';
import { CountryCreateComponent } from './pages/country-create/country-create.component';
import { CityListComponent } from './pages/city-list/city-list.component';
import { CityCreateComponent } from './pages/city-create/city-create.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'people', component: PersonListComponent, canActivate: [AppAuthGuard], data: {roles: [AppRoles.Viewer]}},
  {
    path: 'person', canActivate: [AppAuthGuard], component: PersonCreateComponent, pathMatch: 'full',
    data: {roles: [AppRoles.User]}
  },
  {
    path: 'person/:id', canActivate: [AppAuthGuard], component: PersonCreateComponent, pathMatch: 'full',
    data: {roles: [AppRoles.User]}
  },
  {path: 'contactdetailsList', component: ContactDetailsListComponent, canActivate: [AppAuthGuard], data: {roles: [AppRoles.Viewer]}},
  {
    path: 'contactdetails', canActivate: [AppAuthGuard], component: ContactDetailsCreateComponent, pathMatch: 'full',
    data: {roles: [AppRoles.User]}
  },
  {
    path: 'contactdetails/:id', canActivate: [AppAuthGuard], component: ContactDetailsCreateComponent, pathMatch: 'full',
    data: {roles: [AppRoles.User]}
  },
  {path: 'countries', component: CountryListComponent, canActivate: [AppAuthGuard], data: {roles: [AppRoles.Viewer]}},
  {
    path: 'country', canActivate: [AppAuthGuard], component: CountryCreateComponent, pathMatch: 'full',
    data: {roles: [AppRoles.Admin]}
  },
  {
    path: 'country/:id', canActivate: [AppAuthGuard], component: CountryCreateComponent, pathMatch: 'full',
    data: {roles: [AppRoles.Admin]}
  },
  {path: 'cities', component: CityListComponent, canActivate: [AppAuthGuard], data: {roles: [AppRoles.Viewer]}},
  {
    path: 'city', canActivate: [AppAuthGuard], component: CityCreateComponent, pathMatch: 'full',
    data: {roles: [AppRoles.Admin]}
  },
  {
    path: 'city/:id', canActivate: [AppAuthGuard], component: CityCreateComponent, pathMatch: 'full',
    data: {roles: [AppRoles.Admin]}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
