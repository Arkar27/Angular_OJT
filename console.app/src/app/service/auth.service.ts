import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn() {
    console.log('----- Check LoggedIn -------');
    console.log(sessionStorage.getItem('userRole'));
    if ( sessionStorage.getItem('userRole') != null) {
      return true;
    } else {
      return false;
    }
  }
}
