import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageLayoutComponent } from './pages/page-layout.component';


const routes: Routes = [
  {    path: '', redirectTo: 'login', pathMatch: 'full'  },
  {    path: 'login', component: LoginComponent  },
  {    path: '', component: PageLayoutComponent,
       loadChildren: () => import('./pages/page-layout.module').then(m => m.PageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
