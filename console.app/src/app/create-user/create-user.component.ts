//https://stackblitz.com/edit/angular-vjgcxj?file=src%2Fapp%2Fapp.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from '../models/models';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { LoginAuthService } from '../service/login-auth.service';
import { Route, Router } from '@angular/router';
// import { PasswordValidation } from './password-validator';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  reactiveForm !: FormGroup;
  user!: User;
  hide = true;
  conPw: string = '';
  pw: string = '';
  userName: string = '';
  mail: string = '';
  arraydata:FormData [] = [];
  // haveData = sessionStorage.getItem('haveData');
  // valuename = sessionStorage.getItem('userName');
  // valueEmail = sessionStorage.getItem('userEmail');
  // valuePassword = sessionStorage.getItem('userPassword');
  // valueType = sessionStorage.getItem('userType');
  // valuePhone = sessionStorage.getItem('userPhone');
  // valueDob = sessionStorage.getItem('userDob');
  // valueAddress = sessionStorage.getItem('userAddress');
  constructor(
    private loginService: LoginAuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required
      ]),
      
      date: new FormControl(null,[
        Validators.required,
      ]),
      phone: new FormControl(null,[
        Validators.required,
        Validators.pattern("^((\\+95-?)|0)?[0-9]{10}$")
      ]),
      address: new FormControl(null,[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(250)
      ]),
      type: new FormControl(null,[
        Validators.required
      ]),
      
    },
    {
      // validators: PasswordValidation.MatchPassword
    }
    );
    
  }
  
  
  get email(){
    return this.reactiveForm.get('email')!;
  }
  get name() {
    return this.reactiveForm.get('name');
  }
  get password() {
    return this.reactiveForm.get('password');
  }
  get confirmPassword() {
    return this.reactiveForm.get('confirmPassword')
  }
  get date(){
    return this.reactiveForm.get('date')
  }
  get phone(){
    return this.reactiveForm.get('phone');
  }
  get address(){
    return this.reactiveForm.get('address');
  }
  toConfirm() {
    let form = this.reactiveForm.value
    // let data: any = [];
    // data.push({
    //   'name': form.name,
    //   'email': form.email,
    //   'password': form.password,
    //   'type': form.type,
    //   'phone': form.phone,
    //   'dob': form.dob,
      
    // });
    // let lengthPw = (form.password.length)
    // this.arraydata.push(c, form.email, form.password, form.type, form.phone, form.dob, form.address );
    sessionStorage.setItem('userName', form.name);
    sessionStorage.setItem('userEmail', form.email);
    sessionStorage.setItem('userPassword', form.password);
    sessionStorage.setItem('userType', form.type);
    sessionStorage.setItem('userPhone', form.phone);
    sessionStorage.setItem('userDob', form.date );
    sessionStorage.setItem('userAddress', form.address);
    this.router.navigateByUrl('confirm_user');
    

   }

}

