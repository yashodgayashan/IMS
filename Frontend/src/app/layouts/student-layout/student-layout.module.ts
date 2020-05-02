import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentLayoutRoutingModule } from './student-layout-routing.module';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SelectedStudentsComponent } from './pages/selected-students/selected-students.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [DashboardComponent, SelectedStudentsComponent],
  imports: [
    CommonModule,
    StudentLayoutRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class StudentLayoutModule { }

