import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/models';
import { UserListService } from '../service/user-list.service';

@Component({
  selector: 'app-post-update-confirm',
  templateUrl: './post-update-confirm.component.html',
  styleUrls: ['./post-update-confirm.component.css']
})
export class PostUpdateConfirmComponent implements OnInit {

  public posts: Post[] = []
  title = sessionStorage.getItem('postTitle');
  description = sessionStorage.getItem('postDescription');

  constructor(
    private userService: UserListService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }
  postUpdate(){
    const post = {
      id : sessionStorage.getItem('editPostId'),
      title: this.title,
      description: this.description,
      ownerId : sessionStorage.getItem('userId')
    };
    
      this.userService.editPost(post).subscribe((data) => {
        this.posts.unshift(data);
        console.log(data)
        this.router.navigateByUrl('post_list')
    }, error => {
      console.log('ERROR :: ', error);
    });

  }

}
