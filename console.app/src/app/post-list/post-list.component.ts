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
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  // searchName: string ='';
  //  searchEmail: string = '';
  //  searchDob: string = '';
  // searchForm!:FormGroup;
  public posts:any = [];
  public userArray: any = [];
  private resp: string = '';
  userRole = sessionStorage.getItem('uesrRole');
  private buttonDisabled : boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatSort, { static: true }) sort!: MatSort;
  
  
  public displayedColumns: string[] = ['id', 'title', 'description', 'create_user_id', 'edit','delete'];
  public dataSource = new MatTableDataSource<User>();

  constructor(
    private userSvc: UserListService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
    ) {}
     
     

  ngOnInit(): void {
    this.getPostList();
    if(this.userRole == '1'){
      this.buttonDisabled = true;
    }
    else{
      this.buttonDisabled = false;
    }
    
    // this.dataSource.sort = this.sort;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  

  getPostList(): void {
    this.userSvc.getPostList().subscribe(posts => {
      this.posts = posts;
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
        this.deletePost(id)
        this.snackBar.open('The user is successfully deleted.', 'Close', {
          duration: 3000,
        });
      }
    });
  }
  
  deletePost(id:any): void {
    console.log("Delete :: ", id)
    this.userSvc.deletePost(id).subscribe(resp => {
      this.resp = resp;
      this.getPostList();
      console.log(this.resp)
    },error =>{
      console.log('ERROR ::', error)
    });
  }
  // search(){
  //   const arr = {
  //     'name': this.searchName,
  //     'email': this.searchEmail,
  //     'date': this.searchDob
  //   }

  //   console.log(arr);
  //   this.userSvc.searchUser(arr).then(res => {
      
  //     if (res) {
  //       this.users = res;
  //       this.showData();
  //       console.log('show done')
  //     }
  //     else{
  //       alert('There is no content.')
  //     }

  //   }, error => {
  //     console.log('ERROR :: ', error);
  //   });
    
  // }
  // toUserList(){
  //   this.getUserList();
  // }
  showData(): void {
    this.dataSource = new MatTableDataSource(this.posts);
    console.log(this.posts)
    this.dataSource.paginator = this.paginator;
    
  }
  showSearchData(): void {
    this.dataSource = new MatTableDataSource(this.userArray);
    this.dataSource.paginator = this.paginator;
    
  }

  editPost(id:string){
    sessionStorage.setItem('editPostId', id)
    this.router.navigateByUrl('post_edit')
  }


}
