import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { LoginAuthService } from '../service/login-auth.service';

interface EachUser {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  title = 'loginForm'
  reactiveForm !: FormGroup;
  user!: EachUser;
  hide = true;
  userid = '1';
  personName: string = '';
  personPassword: string = '';
  constructor(
    private loginService: LoginAuthService,
    private router: Router) {
    this.user = {} as EachUser;
    sessionStorage.clear();

   }

  ngOnInit(): void {
    //localStorage.setItem('session', this.userid)
    this.reactiveForm = new FormGroup({
      email : new FormControl(this.user.email,[
        Validators.required,
        Validators.email
      ]),
      password : new FormControl(this.user.password,[
        Validators.required,
      ]),
    })
  }
  get email(){
    return this.reactiveForm.get('email')!;
  }
  get password(){
    return this.reactiveForm.get('password')!;
  }
  login(): void {
    // this.loginService.logout();
    // localStorage.setItem('token', 'thisisjusttoken')
    this.loginService.login(this.reactiveForm.value.email, this.reactiveForm.value.password).then(res => {
      if (res[0]) {
        console.log("Login Success");
        sessionStorage.setItem('userRole', res[1])
        sessionStorage.setItem('userId', res[2])
        this.router.navigateByUrl('dashboard');
      }
      else {
        alert('Invalid Credential.')
      }
    }).catch(error => {
      alert('User does not exit.')
      console.log('error ', error);
      // this.authFailureMessage = this.clientMsg.APPLICATION_ERROR.AUTH;
    });
  }
}