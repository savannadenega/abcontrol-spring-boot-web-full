import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import localePTBR from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { fakeBackendProvider } from './fake-backend-interceptor';
import { AppComponent } from './app.component';
import { MaterialService } from './material.service';
import { MaterialsComponent } from './materials/materials.component';
import { AppRoutingModule } from './/app-routing.module';
import { MessagesComponent, MessageToast } from './messages/messages.component';
import { MaterialRowComponent } from './materials/material-row/material-row.component';
import { FormasPagamentoComponent } from './formas-pagamento/formas-pagamento.component';
import { ObrasComponent } from './obras/obras.component';
import { ComprasComponent } from './compras/compras.component';
import { CompraDetailsComponent } from './compra-details/compra-details.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { ProjetoDetailsComponent } from './projeto-details/projeto-details.component';

registerLocaleData(localePTBR);

@NgModule({
  declarations: [
    AppComponent,
    MaterialsComponent,
    MessagesComponent,
    MessageToast,
    MaterialRowComponent,
    FormasPagamentoComponent,
    ObrasComponent,
    ComprasComponent,
    CompraDetailsComponent,
    ProjetosComponent,
    ProjetoDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    FontAwesomeModule,
    MatAutocompleteModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    MaterialService,
    fakeBackendProvider
  ],
  entryComponents : [
    MessageToast
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
