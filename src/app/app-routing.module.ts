import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaterialsComponent } from './materials/materials.component';
import { FormasPagamentoComponent } from './formas-pagamento/formas-pagamento.component';
import { ObrasComponent } from './obras/obras.component';

const routes : Routes = [
  { path: 'materials', component: MaterialsComponent},
  { path: 'formas', component: FormasPagamentoComponent },
  { path : 'obras', component: ObrasComponent},
  { path: '', redirectTo: '/materials', pathMatch: 'full' }
];

export const links = [
  { 'link': '/materials', 'label' : 'Materiais e Ferramentas'},
  { 'link': '/formas', 'label' : 'Formas de pagamento'},
  { 'link': '/obras', 'label': 'Obras'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ], 
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
