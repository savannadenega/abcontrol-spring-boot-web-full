import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { fakeBackendProvider } from './fake-backend-interceptor';
import { AppComponent } from './app.component';
import { MaterialService } from './material.service';
import { MaterialsComponent } from './materials/materials.component';
import { AppRoutingModule } from './/app-routing.module';
import { MessagesComponent, MessageToast } from './messages/messages.component';
import { MaterialRowComponent } from './materials/material-row/material-row.component';
@NgModule({
  declarations: [
    AppComponent,
    MaterialsComponent,
    MessagesComponent,
    MessageToast,
    MaterialRowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [
    MaterialService,
    fakeBackendProvider
  ],
  entryComponents : [
    MessageToast
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
