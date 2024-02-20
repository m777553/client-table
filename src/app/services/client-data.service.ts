import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, pluck } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SelectionInfo, User } from '../models/client-data.model';
import { SelectionModel } from '@angular/cdk/collections';

@Injectable({
  providedIn: 'root',
})
export class ClientDataService {
  private readonly _API_URL = 'https://test-data.directorix.cloud/task1';
  selectedUsers = new BehaviorSubject<User[]>([]);
  private _dataSource = new BehaviorSubject<User[]>([]);
  dataSource$ = this._dataSource.asObservable();

  constructor(private _http: HttpClient) { }



  getUsers(): Observable<User[]> {
    return this._http.get<{ users: User[] }>(this._API_URL).pipe(
      pluck('users'),
      tap(users => this._dataSource.next(users))
    );
  }

  removeSelected(users: User[]): Observable<boolean> {
    //здесь должен быть запрос на сервер для удаления выбранных пользователей
    // return this._http.delete<User[]>(this._API_URL, {body: users})
    // id пользователей с сервера не приходит поэтому отправляется пользователь целиком, что не очень хорошо
    //но так как сервер не поддерживает удаление, то просто удаляем их из таблицы


    const updatedUsers = this._dataSource.value.filter(user => !users.includes(user));
    this._dataSource.next(updatedUsers);
    // this.selectedUsers.next([]);
    return of(true)
  }
}
