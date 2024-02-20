import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTableComponent } from './client-table.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        ClientTableComponent,
    ],
    exports: [
        ClientTableComponent,
    ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatSortModule,
    MatTableModule,
    FormsModule
  ],
})
export class ClientTableModule { }
