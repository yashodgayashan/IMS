import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentListComponent } from './pages/student-list/student-list.component';

const StudentLayoutRoutes: Routes = [
  { path: 'dashboard',            component: DashboardComponent },
  { path: 'Students',             component: StudentListComponent }

];

@NgModule({
  imports: [RouterModule.forChild(StudentLayoutRoutes)],
  exports: [RouterModule]
})
export class CompanyLayoutRoutingModule { }
