import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { SearchComponent } from './search/search.component';
import { ViewComponent } from './profile/view/view.component';
import { EditComponent } from './profile/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'direc', component: MapComponent },
  { path: 'notify', component: SendNotificationComponent },
  { path: 'search', component: SearchComponent },
  {
    path: 'profile',
    children: [
      { path: 'view', component: ViewComponent },
      { path: 'edit', component: EditComponent }
    ]
  }
  /* { path: 'editprofile', component: EditComponent},
  { path: 'viewprofile', component: ViewComponent }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
