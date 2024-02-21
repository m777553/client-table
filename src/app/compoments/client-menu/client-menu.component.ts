import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientDataService } from '../../services/client-data.service';
import { filter, Observable, switchMap, switchMapTo, take } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { map, tap } from 'rxjs/operators';
import { AddClientDialogComponent } from '../add-client-dialog/add-client-dialog.component';
import { User } from '../../models/client-data.model';

@Component({
  selector: 'inum-client-menu',
  templateUrl: './client-menu.component.html',
  styleUrls: ['./client-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientMenuComponent {
  hasSelected$: Observable<boolean> = this._clientService.selectedUsers.pipe(
    map(selected => selected.length > 0),
  );

  constructor(private _matDialog: MatDialog, private _clientService: ClientDataService) {
  }

  removeClient() {
    this._matDialog.open(ConfirmDialogComponent, {
      width: ConfirmDialogComponent.width,
      data: { selectedCount: this._clientService.selectedUsers.value.length },
    })
      .afterClosed()
      .pipe(
        filter(result => result),
        switchMap(() => this._clientService.removeSelected(this._clientService.selectedUsers.value)),
      )
      .subscribe();
  }


  addClient() {
    this._matDialog.open(AddClientDialogComponent, {
      width: AddClientDialogComponent.width,
    })
      .afterClosed()
      .pipe(
        filter(result => result),
        switchMap((result: User) => {
          return this._clientService.addClient(result);
        }),
      )
      .subscribe();
  }
}
