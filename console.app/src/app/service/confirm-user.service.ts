import { Injectable } from '@angular/core';
import { User } from 'app/models/models';

@Injectable({
  providedIn: 'root'
})
export class ConfirmUserService {
  info: User[] = []

  constructor() { }
  addToInfo(userInfo:User) {
    this.info.push(userInfo)
  }
}
