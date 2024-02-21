import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailPatternValidation } from '../../validators/email.validator';
import { phonePatternValidation } from '../../validators/phone.validator';

@Component({
  selector: 'inum-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddClientDialogComponent implements OnInit {
  static width = '511px';
  clientForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _dialogRef: MatDialogRef<AddClientDialogComponent>) {
  }

  ngOnInit() {
    this.clientForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, emailPatternValidation]],
      phone: ['', phonePatternValidation],
    });
  }

  onCancel() {
    this._dialogRef.close();
  }

  onConfirm() {
    this._dialogRef.close(this.clientForm.value);
  }
}
