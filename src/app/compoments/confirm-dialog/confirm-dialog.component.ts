import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'inum-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  title = this.data.selectedCount > 1 ? 'Удалить выбранные строки' : 'Удалить выбранную строку';
  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedCount: number }) { }
}
