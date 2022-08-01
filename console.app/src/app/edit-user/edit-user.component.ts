import { Component, OnInit } from '@angular/core';
import { User } from '../models/models';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { LoginAuthService } from '../service/login-auth.service';
import { Route, Router } from '@angular/router';
import { UserListService } from '../service/user-list.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  reactiveForm !: FormGroup;
  // user!: User;
  public user: any = [];
  hide = true;
  conPw: string = '';
  pw: string = '';
  userName: string = '';
  mail: string = '';
  arraydata:FormData [] = [];
  id = sessionStorage.getItem('editId')!;
  // haveData = sessionStorage.getItem('haveData');
  // valuename = sessionStorage.getItem('userName');
  // valueEmail = sessionStorage.getItem('userEmail');
  // valuePassword = sessionStorage.getItem('userPassword');
  // valueType = sessionStorage.getItem('userType');
  // valuePhone = sessionStorage.getItem('userPhone');
  // valueDob = sessionStorage.getItem('userDob');
  // valueAddress = sessionStorage.getItem('userAddress');
  editId = sessionStorage.getItem('editId');
  editName = sessionStorage.getItem('editName');
  editEmail = sessionStorage.getItem('editEmail');
  editType = sessionStorage.getItem('editType');
  editPhone = sessionStorage.getItem('editPhone');
  editAddress = sessionStorage.getItem('address');
  editDob = sessionStorage.getItem('editDob');
  constructor(
    private loginService: LoginAuthService,
    private router: Router,
    private userSvc: UserListService,
  ) { }

  ngOnInit(): void {
    this.getUserDetail(this.id);
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
    this.router.navigateByUrl('confirm_edit_user/${this.id}');
    

   }
   async getUserDetail(id:string) {
    this.userSvc.getUserDetail(id).subscribe(user => {
      this.user = user;
      console.log(this.user);
      console.log(this.user[0].name)
      // return user;
    }, error => {
      console.log('ERROR :: ', error);
    });
  }

}
