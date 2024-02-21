/* eslint-disable max-lines */
import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MatIconService {
  listIcons = [
    {
      name: 'add',
      src: 'assets/icons/add.svg',
    },
    {
      name: 'remove',
      src: 'assets/icons/remove.svg',
    },
  ];
  constructor(private _matIconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer) {}

  init(): void {
    this.listIcons.forEach(({ name, src }) =>
      this._matIconRegistry.addSvgIcon(
        name,
        this._domSanitizer.bypassSecurityTrustResourceUrl(src),
      ),
    );
  }
}
