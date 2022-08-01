import { Component,OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { UserListService } from '../service/user-list.service';
import { User } from '../models/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
   searchName: string ='';
   searchEmail: string = '';
   searchDob: string = '';
  searchForm!:FormGroup;
  public users:any = [];
  public user: any = [];
  public userArray: any = [];
  private resp: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatSort, { static: true }) sort!: MatSort;
  
  
  public displayedColumns: string[] = ['id', 'name', 'email', 'create_user_id', 'phone','dob','address','created_at','updated_at','edit','delete'];
  public dataSource = new MatTableDataSource<User>();

  constructor(
    private userSvc: UserListService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
    ) {}
     
     

  ngOnInit(): void {
    this.getUserList();
    // this.dataSource.sort = this.sort;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  

  getUserList(): void {
    this.userSvc.getUserList().subscribe(users => {
      this.users = users;
      this.showData();
    }, error => {
      console.log('ERROR :: ', error);
    });
  }

  

  openDialog(id: any) {
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteUser(id)
        this.snackBar.open('The user is successfully deleted.', 'Close', {
          duration: 3000,
        });
      }
    });
  }
  
  deleteUser(id:any): void {
    console.log("Delete :: ", id)
    this.userSvc.deleteUser(id).subscribe(resp => {
      this.resp = resp;
      this.getUserList();
      console.log(this.resp)
    },error =>{
      console.log('ERROR ::', error)
    });
  }
  search(){
    const arr = {
      'name': this.searchName,
      'email': this.searchEmail,
      'date': this.searchDob
    }
    console.log(arr);
    this.userSvc.searchUser(arr).subscribe(users => {
      this.users = users;
      this.userArray=[];
      // for (let i = 0; i < users.length; i++) {
      //   console.log(users[i]);
      //   let new_arr = JSON.stringify({
      //   id: users[i][0],
      //   name: users[i][1],
      //   email: users[i][2],
      //   create_user_id: users[i][3],
      //   phone: users[i][4],
      //   dob: users[i][5],
      //   address: users[i][6],
      //   created_at: users[i][7],
      //   updated_at: users[i][8]
      //   });
        
      //   this.userArray.push(new_arr)
      //   console.log(new_arr)
        
      // }


      // let jsonObject = {};
      // users.forEach(item => obj[item.id] = item.name);
      // let json = JSON.stringify(jsonObject);
      // console.log(users)
      


      // JSON.stringify({
      //   'id': users.id,
      //   'name': users.name,
        
      // })
      console.log(this.userArray)
      
      this.showSearchData();
    }, error => {
      console.log('ERROR :: ', error);
    });
    
  }
  toUserList(){
    this.getUserList();
  }
  showData(): void {
    this.dataSource = new MatTableDataSource(this.users);
    console.log(this.users)
    this.dataSource.paginator = this.paginator;
    
  }
  showSearchData(): void {
    this.dataSource = new MatTableDataSource(this.userArray);
    this.dataSource.paginator = this.paginator;
    
  }

  editUser(id:string){
    sessionStorage.setItem('editId', id);
    this.router.navigateByUrl('edit_user/${id}')
  }
  

  

}
