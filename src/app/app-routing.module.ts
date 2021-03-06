import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaterialsComponent } from './materials/materials.component';
import { FormasPagamentoComponent } from './formas-pagamento/formas-pagamento.component';
import { ObrasComponent } from './obras/obras.component';
import { ComprasComponent } from './compras/compras.component';
import { CompraDetailsComponent } from './compra-details/compra-details.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { ProjetoDetailsComponent } from './projeto-details/projeto-details.component';

const routes : Routes = [
  { path: 'materials', component: MaterialsComponent},
  { path: 'formas', component: FormasPagamentoComponent },
  { path : 'obras', component: ObrasComponent},
  { path: 'compras', component: ComprasComponent},
  { path: 'compras/:id', component: CompraDetailsComponent},
  { path: 'compras/new', component: CompraDetailsComponent},
  { path: 'projetos', component: ProjetosComponent},
  { path: 'projetos/:id', component: ProjetoDetailsComponent},
  { path: 'projetos/new', component: ProjetoDetailsComponent},
  { path: '', redirectTo: '/materials', pathMatch: 'full' }
];

export const links = [
  { 'link': '/materials', 'label' : 'Materiais e Ferramentas'},
  { 'link': '/formas', 'label' : 'Formas de pagamento'},
  { 'link': '/obras', 'label': 'Obras'},
  { 'link': '/projetos', 'label': 'Projetos'},
  { 'link': '/compras', 'label': 'Compras'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ], 
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
