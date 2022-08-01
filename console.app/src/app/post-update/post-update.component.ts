import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {

  reactiveForm!: FormGroup;


  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      title: new FormControl(null,[
        Validators.required,
        Validators.maxLength(30)
      ]),
      description: new FormControl(null,[
        Validators.required,
        Validators.maxLength(255),
      ]),
    });
  }
  get title(){
    return this.reactiveForm.get('title');
  }
  get description(){
    return this.reactiveForm.get('description');
  }
  toConfirm(){
    let form = this.reactiveForm.value;
    sessionStorage.setItem('postTitle', form.title);
    sessionStorage.setItem('postDescription', form.description);
    this.router.navigateByUrl('post_update_confirm')
    
  }
}
