import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunalRoomComponent } from './components/rooms/communal-room/communal-room.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RoomRedirectComponent } from './components/rooms/room-redirect/room-redirect.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent  
  }, 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'courts/:court_id',
    component: RoomRedirectComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
