import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaterialsComponent } from './materials/materials.component';

const routes : Routes = [
  { path: 'materials', component: MaterialsComponent},
  { path: '', redirectTo: '/materials', pathMatch: 'full' }
];

export const links = [
  { 'link': '/materials', 'label' : 'Materiais e Ferramentas'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ], 
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
