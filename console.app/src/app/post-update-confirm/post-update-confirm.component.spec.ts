import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostUpdateConfirmComponent } from './post-update-confirm.component';

describe('PostUpdateConfirmComponent', () => {
  let component: PostUpdateConfirmComponent;
  let fixture: ComponentFixture<PostUpdateConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostUpdateConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostUpdateConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
