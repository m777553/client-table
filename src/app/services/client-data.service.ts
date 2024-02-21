import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, pluck } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/client-data.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ClientDataService {
  private readonly _API_URL = 'https://test-data.directorix.cloud/task1';
  selectedUsers = new BehaviorSubject<User[]>([]);
  private _dataSource = new BehaviorSubject<User[]>([]);
  dataSource$ = this._dataSource.asObservable();

  constructor(private _http: HttpClient, private _localStorage: LocalStorageService) {
  }


  getUsers(): Observable<User[]> {
    return this._http.get<{ users: User[] }>(this._API_URL).pipe(
      pluck('users'),
      map(users=>{
        if (this._localStorage.getStorage()){
          const data = this._getLocalStorageIds();
          for (let key in data){
            users.push(JSON.parse(key));
          }
        }
        return users;
      }),
      tap(users => this._dataSource.next(users)),
    );
  }

  removeSelected(users: User[]): Observable<boolean> {
    //здесь должен быть запрос на сервер для удаления выбранных пользователей
    // return this._http.delete<User[]>(this._API_URL, {body: users})
    // id пользователей с сервера не приходит поэтому отправляется пользователь целиком, что не
    // очень хорошо но так как сервер не поддерживает удаление, то просто удаляем их из таблицы

    const updatedUsers = this._dataSource.value.filter(user => !users.includes(user));
    this._dataSource.next(updatedUsers);
    users.forEach(user => this._removeLocalStorage(user));
    return of(true);
  }
  addClient(user: User): Observable<boolean> {
    //здесь должен быть запрос на сервер для удаления выбранных пользователей
    // return this._http.put<User>(this._API_URL, {body: users})

    const updatedUsers = [...this._dataSource.value, user];
    this._dataSource.next(updatedUsers);
    this._setLocalStorage(user);
    return of(true);
  }

  // save to storage
  private _setLocalStorage(user: User) {
    //здесь должно быть id пользователя, но так как его нет, то используется весь объект
    const userId= JSON.stringify(user);
    this._localStorage.saveData(userId, 'true');
  }

  // remove from storage
  private _removeLocalStorage(user: User) {
    const userId= JSON.stringify(user);
    this._localStorage.removeData(userId);
  }

  private _getLocalStorageIds(): Record<string, string> {
    const data: Record<string, string> = {};

    Object.keys(this._localStorage.getStorage()).forEach((item) => {
      if (item.includes('{"name"')) {
        // @ts-ignore
        data[item] = this._localStorage.getData(item);
      }
    });

    return data;
  }
}
