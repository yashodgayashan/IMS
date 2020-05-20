import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { CompanyLayoutComponent } from './layouts/company-layout/company-layout.component';
import { LoginComponent } from './shared/login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  },
  {
    path: 'student',
    component: StudentLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: './layouts/student-layout/student-layout.module#StudentLayoutModule'
      }
    ]
  },
  {
    path: 'company',
    component: CompanyLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: './layouts/company-layout/company-layout.module#CompanyLayoutModule'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
