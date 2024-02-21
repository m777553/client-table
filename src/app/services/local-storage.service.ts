import { Injectable } from '@angular/core';
import { User } from '../models/client-data.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getStorage(): Storage {
    return localStorage;
  }

  saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getData(key: string) {
    return localStorage.getItem(key);
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  clearData() {
    localStorage.clear();
  }
}
