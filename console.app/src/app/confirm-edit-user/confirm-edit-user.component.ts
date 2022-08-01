import { Component, OnInit } from '@angular/core';
import { UserListService } from '../service/user-list.service';
import { User } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-edit-user',
  templateUrl: './confirm-edit-user.component.html',
  styleUrls: ['./confirm-edit-user.component.css']
})
export class ConfirmEditUserComponent implements OnInit {

  public users : User[]=[];
  name = sessionStorage.getItem('userName');
  email = sessionStorage.getItem('userEmail');
  password = sessionStorage.getItem('userPassword');
  type = sessionStorage.getItem('userType');
  phone = sessionStorage.getItem('userPhone');
  dob = sessionStorage.getItem('userDob');
  address = sessionStorage.getItem('userAddress');
  id = sessionStorage.getItem('editId')!;
  


  constructor(
    private userService: UserListService,
    private router: Router
    ) {}

  ngOnInit(): void {
    
  }
  userEdit(){
    const user = {
      id :  this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      phone:this.phone,
      address:this.address,
      dob:this.dob,
      type:this.type
     
    };
    
      this.userService.editUser(user, this.id).subscribe((data) => {
        this.users.unshift(data);
        console.log(data)
        this.router.navigateByUrl('user_list');

    }, error => {
      console.log('ERROR :: ', error);
    });
  
  
  
  }
  toCreate(){
    sessionStorage.setItem('haveData', 'true');
  }

}
