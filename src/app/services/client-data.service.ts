import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, pluck, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/client-data.model';

const MOCK_USERS: { users: User[] } = {
  'users': [{
    'name': 'Александр', 'surname': 'Петров', 'email': 'petrov@mail.ru', 'phone': '+79061856195',
  }, {
    'name': 'Павел', 'surname': 'Прилучный', 'email': 'ppl98@mail.ru', 'phone': '+79891456090',
  }, {
    'name': 'Иван', 'surname': 'Охлобыстин', 'email': 'iohl_990@mail.ru', 'phone': '+79053856195',
  }, {
    'name': 'Марина', 'surname': 'Александрова', 'email': 'malexan21@mail.ru',
    'phone': '+79052206950',
  }, { 'name': 'Юрий', 'surname': 'Борисов', 'email': 'borisov@gmail.com', 'phone': '' },
    {
      'name': 'Александр', 'surname': 'Петров', 'email': 'petrov@mail.ru', 'phone': '+79061856195',
    }, {
      'name': 'Павел', 'surname': 'Прилучный', 'email': 'ppl98@mail.ru', 'phone': '+79891456090',
    }, {
      'name': 'Иван', 'surname': 'Охлобыстин', 'email': 'iohl_990@mail.ru', 'phone': '+79053856195',
    }, {
      'name': 'Марина', 'surname': 'Александрова', 'email': 'malexan21@mail.ru',
      'phone': '+79052206950',
    }, {
      'name': 'Александр', 'surname': 'Петров', 'email': 'petrov@mail.ru', 'phone': '+79061856195',
    }, {
      'name': 'Павел', 'surname': 'Прилучный', 'email': 'ppl98@mail.ru', 'phone': '+79891456090',
    }, {
      'name': 'Иван', 'surname': 'Охлобыстин', 'email': 'iohl_990@mail.ru', 'phone': '+79053856195',
    }, {
      'name': 'Марина', 'surname': 'Александрова', 'email': 'malexan21@mail.ru',
      'phone': '+79052206950',
    }, {
      'name': 'Александр', 'surname': 'Петров', 'email': 'petrov@mail.ru', 'phone': '+79061856195',
    }, {
      'name': 'Павел', 'surname': 'Прилучный', 'email': 'ppl98@mail.ru', 'phone': '+79891456090',
    }, {
      'name': 'Иван', 'surname': 'Охлобыстин', 'email': 'iohl_990@mail.ru', 'phone': '+79053856195',
    }, {
      'name': 'Марина', 'surname': 'Александрова', 'email': 'malexan21@mail.ru',
      'phone': '+79052206950',
    },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class ClientDataService {
  private readonly _API_URL = 'https://test-data.directorix.cloud/task1';
  selectedUsers = new BehaviorSubject<User[]>([]);
  private _dataSource = new BehaviorSubject<User[]>([]);
  dataSource$ = this._dataSource.asObservable();

  constructor(private _http: HttpClient) {
  }


  getUsers(): Observable<User[]> {
    return this._http.get<{ users: User[] }>(this._API_URL).pipe(
      pluck('users'),
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
    // this.selectedUsers.next([]);
    return of(true);
  }
  addClient(user: User): Observable<boolean> {
    //здесь должен быть запрос на сервер для удаления выбранных пользователей
    // return this._http.put<User>(this._API_URL, {body: users})

    const updatedUsers = [...this._dataSource.value, user];
    this._dataSource.next(updatedUsers);
    return of(true);
  }
}
