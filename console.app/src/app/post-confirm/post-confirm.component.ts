import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/models';
import { UserListService } from '../service/user-list.service';

@Component({
  selector: 'app-post-confirm',
  templateUrl: './post-confirm.component.html',
  styleUrls: ['./post-confirm.component.css']
})
export class PostConfirmComponent implements OnInit {
  public posts: Post[] = []
  title = sessionStorage.getItem('postTitle');
  description = sessionStorage.getItem('postDescription');

  constructor(
    private userService: UserListService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }
  postAdd(){
    const post = {
      title: this.title,
      description: this.description,
      ownerId : sessionStorage.getItem('userId')
    };
    
      this.userService.addPost(post).subscribe((data) => {
        this.posts.unshift(data);
        console.log(data)
        this.router.navigateByUrl('post_list')
    }, error => {
      console.log('ERROR :: ', error);
    });

  }

}
