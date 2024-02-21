import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientMenuModule } from './compoments/client-menu/client-menu.module';
import { ClientTableModule } from './compoments/client-table/client-table.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './compoments/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddClientDialogComponent } from './compoments/add-client-dialog/add-client-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EmailPatternValidatorDirective } from './validators/email-pattern-validator.directive';
import { PhonePatternValidatorDirective } from './validators/phone-pattern-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    AddClientDialogComponent,
    EmailPatternValidatorDirective,
    PhonePatternValidatorDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ClientMenuModule,
    ClientTableModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
