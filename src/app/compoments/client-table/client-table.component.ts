import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/client-data.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { ClientDataService } from '../../services/client-data.service';
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'inum-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['select', 'name', 'surname', 'email', 'phone'];
  dataSource = new MatTableDataSource<User>();
  selectionModel = new SelectionModel<User>(true, []);

  isIndeterminate$ = new BehaviorSubject(false);
  allSelected$ = new BehaviorSubject(false);

  private _unsubscribe$ = new Subject<void>();

  constructor(public _clientService: ClientDataService) {

  }

  ngOnInit() {
    this._clientService.getUsers().pipe(take(1)).subscribe();
    this._clientService.dataSource$.pipe(
      tap(users=>{
        this.dataSource.data = users;
        this.selectionModel.clear();
        this._checkIsIndeterminate()
      }),
      takeUntil(this._unsubscribe$)
    ).subscribe();


    this.selectionModel.changed.pipe(
      tap(() => {
        // this._clientService.selectedUsers.next(users.source.selected);
        this._clientService.selectedUsers.next(this.selectionModel.selected);
        this._checkIsIndeterminate();
      }),
      takeUntil(this._unsubscribe$)
    ).subscribe()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  toggleAll() {
    if (this.selectionModel.selected.length === this.dataSource.data.length) {
      this.selectionModel.clear();
    } else {
      this.dataSource.data.forEach(row => this.selectionModel.select(row));
    }
  }

  private _checkIsIndeterminate() {
    const selectedCount = this._clientService.selectedUsers.value.length;
    const totalCount = this.dataSource.data.length;
    if (!selectedCount) {
      this.isIndeterminate$.next( false);
      this.allSelected$.next(false);
      return
    }
    if (selectedCount === totalCount) {
      this.isIndeterminate$.next( false);
      this.allSelected$.next(true);
     return
    }
    this.isIndeterminate$.next( true);
    this.allSelected$.next(false);
  }
}
