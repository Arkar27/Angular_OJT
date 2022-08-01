import { Component, OnInit } from '@angular/core';
import { UserListService } from '../service/user-list.service';
import { User } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.css']
})
export class ConfirmUserComponent implements OnInit {
  public users : User[]=[];
  name = sessionStorage.getItem('userName');
  email = sessionStorage.getItem('userEmail');
  password = sessionStorage.getItem('userPassword');
  type = sessionStorage.getItem('userType');
  phone = sessionStorage.getItem('userPhone');
  dob = sessionStorage.getItem('userDob');
  address = sessionStorage.getItem('userAddress');
  


  constructor(private userService: UserListService, private router: Router) {}

  ngOnInit(): void {
    
  }
  useradd(){
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      phone:this.phone,
      address:this.address,
      dob:this.dob,
      type:this.type
     
    };
    
      this.userService.addUser(user).subscribe((data) => {
        this.users.unshift(data);
        console.log(data)
        this.router.navigateByUrl('user_list')
    }, error => {
      console.log('ERROR :: ', error);
    });
  
  
  
  }
  toCreate(){
    sessionStorage.setItem('haveData', 'true');
  }
  

}
