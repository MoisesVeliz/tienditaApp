import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private key = 'appUser_H_416';

  constructor() { }

  setUser(user: User): void {
    localStorage.setItem(this.key, JSON.stringify(user));
  }

  getUser(): User {
    const user: any = localStorage.getItem(this.key);
    return JSON.parse(user ? user : '{}');
  }

}
