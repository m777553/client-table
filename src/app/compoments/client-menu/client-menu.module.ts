import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientMenuComponent } from './client-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ClientMenuComponent,
  ],
  exports: [
    ClientMenuComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
})
export class ClientMenuModule {
}
