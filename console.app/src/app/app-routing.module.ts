import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { CreateComponent } from './create/create.component';
import { AuthGuard } from './service/auth.guard';
import { RoleGuard } from './service/role.guard';
import { UserListComponent } from './user-list/user-list.component';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ConfirmEditUserComponent } from './confirm-edit-user/confirm-edit-user.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostConfirmComponent } from './post-confirm/post-confirm.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { PostUpdateConfirmComponent } from './post-update-confirm/post-update-confirm.component';

const routes: Routes = [
  {path: 'users',component: UsersComponent,data: { title: 'List of User' }},
  { path: '', component: LoginComponent },
  {path: 'dashboard',component: DashboardComponent,canActivate: [AuthGuard],},
  {path:'create_user', component: CreateUserComponent, canActivate:[RoleGuard, AuthGuard]},
  {path: 'create',component: CreateComponent},
  {path: 'user_list',component: UserListComponent},
  {path: 'confirm_user',component: ConfirmUserComponent},
  {path: 'edit_user/:id',component: EditUserComponent},
  {path: 'confirm_edit_user/:id',component: ConfirmEditUserComponent},
  {path: 'post_list',component: PostListComponent},
  {path: 'post_create',component: PostCreateComponent},
  {path: 'post_confirm',component: PostConfirmComponent},
  {path: 'post_edit',component: PostUpdateComponent},
  {path: 'post_update_confirm', component: PostUpdateConfirmComponent},
  {path:'**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
