import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'inum-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  static width = '511px';
  title = this.data.selectedCount > 1 ? 'Удалить выбранные строки' : 'Удалить выбранную строку';
  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedCount: number }, private _dialogRef: MatDialogRef<ConfirmDialogComponent>) { }
  onConfirm() {
    this._dialogRef.close(true);
  }
  onCancel(): void {
    this._dialogRef.close(false);
  }
}
