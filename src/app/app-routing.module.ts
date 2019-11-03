import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentViewComponent } from './components/student-view/student-view.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '',pathMatch: 'full', redirectTo: 'list'},
      { path: 'add', component: StudentAddComponent },
      { path: 'view/:id', component: StudentViewComponent },
      { path: 'list', component: StudentListComponent },
      { path: '**', component: PageNotFoundComponent }
    ] },
  { path: '',pathMatch: 'full', redirectTo: '/login'},
  { path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true}
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
