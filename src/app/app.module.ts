import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material';

import { fakeBackendProvider } from './fake-backend-interceptor';
import { AppComponent } from './app.component';
import { MaterialService } from './material.service';
import { MaterialsComponent } from './materials/materials.component';
import { AppRoutingModule } from './/app-routing.module';
import { MessagesComponent, MessageToast } from './messages/messages.component';
@NgModule({
  declarations: [
    AppComponent,
    MaterialsComponent,
    MessagesComponent,
    MessageToast
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
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
