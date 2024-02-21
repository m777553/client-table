import { Component } from '@angular/core';
import { MatIconService } from './services/maticon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'servers-table';
  constructor(private _matIcon: MatIconService) {
    this._matIcon.init();
  }
}
