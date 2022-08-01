import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private apiPath = 'search';
  private apiDetail = 'user'

  constructor(
    private http: HttpClient,
  ) { }
  getUserList(): Observable<any> {
    console.log('this is the list')
    return this.http.get(`${environment.apiEndpoint}users`);
  }
  
  deleteUser(id: any): Observable<any> {
    console.log('Calling delete api', )
    return this.http.delete(`${environment.apiEndpoint}delete/${id}`);
  }

  // searchUser(arr:any){
  //   const loginUrl = environment.apiEndpoint + this.apiPath;
  //   const body = {
  //     arr: arr
  //   }
  //   return new Promise((resolve, reject) => {
  //     this.http.post(loginUrl, body).subscribe((data: any) => {
  //       console.log("HERE", data);
  //       resolve(data);
  //     },
  //       error => {
  //         reject(error);
  //       });
  //   });

  // }
  searchUser(body: any): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}search`, body);
  }
  addUser(body: any): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}create`, body);
  }

  editUser(body: any, id:string): Observable<any> {
    return this.http.put(`${environment.apiEndpoint}update/${id}`, body);
  }
  getPostList(): Observable<any> {
    console.log('this is the post list')
    return this.http.get(`${environment.apiEndpoint}posts`);
  }
  
  deletePost(id:string): Observable<any> {
    console.log('Calling post delete api', )
    return this.http.delete(`${environment.apiEndpoint}postDelete/${id}`);
  }
  addPost(body: any): Observable<any>{
    return this.http.post(`${environment.apiEndpoint}postCreate`, body)
  }
  editPost(body: any): Observable<any> {
    return this.http.put(`${environment.apiEndpoint}postUpdate`, body);
  }
  // userDetail(id: string): Observable<any> {
  //   return this.http.get(`${environment.apiEndpoint}user/${id}`);
  // }
  // userDetail(id:string){
  //   const body = {
  //     id: id
  //   }
  //   return new Promise((resolve, reject) => {
  //     this.http.post(`${environment.apiEndpoint}user/${id}`, body).subscribe((data: any) => {
  //       console.log("HERE", data);
  //       resolve(data);
  //     },
  //       error => {
  //         reject(error);
  //       });
  //   });

  // }
  getUserDetail(id:string): Observable<any> {
    console.log('this is the user\'s detail.')
    return this.http.get(`${environment.apiEndpoint}user/${id}`);
  }

}
