import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public SIN_IN_DATA = 'appUser_H_416';
  public DATA_USER = 'dataUser_J_424';

  constructor() { }

  setUser(key: string, user: User): void {
    localStorage.setItem(key, JSON.stringify(user));
  }

  getUser(key: string): User {
    const user: any = localStorage.getItem(key);
    return JSON.parse(user ? user : '{}');
  }

}
