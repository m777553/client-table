import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientDataService } from '../../services/client-data.service';
import { Observable, take } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'inum-client-menu',
  templateUrl: './client-menu.component.html',
  styleUrls: ['./client-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientMenuComponent {
  hasSelected$: Observable<boolean> = this._clientService.selectedUsers.pipe(
    map(selected => selected.length > 0),
  )
  constructor(private _matDialog: MatDialog, private _clientService: ClientDataService) {
  }

  removeSelected() {
    this._matDialog.open(ConfirmDialogComponent, {
      width: ConfirmDialogComponent.width,
      data: { selectedCount: this._clientService.selectedUsers.value.length },
    })
      .afterClosed().subscribe(result => {
      if (result) {
        this._clientService.removeSelected(this._clientService.selectedUsers.value).pipe(
          take(1),
        ).subscribe();
      }
    });
  }


}
