import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SelectedStudentsComponent } from './pages/selected-students/selected-students.component'

const CompanyLayoutRoutes: Routes = [
  { path: 'dashboard',            component: DashboardComponent },
  { path: 'selectedStudents',     component: SelectedStudentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(CompanyLayoutRoutes)],
  exports: [RouterModule]
})
export class StudentLayoutRoutingModule { }
