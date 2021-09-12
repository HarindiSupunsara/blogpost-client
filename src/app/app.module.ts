import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatModule } from './mat/mat.module';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './view/core/alert/alert/alert.component';
import { ConfirmationAlertComponent } from './view/core/alert/confirmation-alert/confirmation-alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,AlertComponent,ConfirmationAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent,ConfirmationAlertComponent]
})
export class AppModule { }
