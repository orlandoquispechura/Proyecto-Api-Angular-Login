import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './vistas/login/login.component';
import { CreateComponent } from "./vistas/create/create.component";
import { EditComponent } from "./vistas/edit/edit.component";
import { InicioComponent } from "./vistas/inicio/inicio.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [LoginComponent, InicioComponent, CreateComponent, EditComponent ]
