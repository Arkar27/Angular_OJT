import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/models';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  reactiveForm !: FormGroup;
  user!: User;

  constructor() { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)
      ]),
    })
  }
  get name() {
    return this.reactiveForm.get('name');
  }

}
