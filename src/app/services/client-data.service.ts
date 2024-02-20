import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pluck } from 'rxjs';
import { User } from '../models/client-data.model';

@Injectable({
  providedIn: 'root',
})
export class ClientDataService {
  private readonly API_URL = 'https://test-data.directorix.cloud/task1';

  constructor(private _http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this._http.get<{ users: User[] }>(this.API_URL).pipe(
      pluck('users'),
    );
  }
}
