import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import localePTBR from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
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

registerLocaleData(localePTBR);

@NgModule({
  declarations: [
    AppComponent,
    MaterialsComponent,
    MessagesComponent,
    MessageToast,
    MaterialRowComponent,
    FormasPagamentoComponent,
    ObrasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    FontAwesomeModule,
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
