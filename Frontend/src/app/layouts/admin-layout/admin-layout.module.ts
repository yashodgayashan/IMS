import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { FormsModule } from '@angular/forms';

import { DashboardComponent }       from './pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { SelectedStudentsComponent } from './pages/selected-students/selected-students.component';
import { NotSelectedStudentsComponent } from './pages/not-selected-students/not-selected-students.component';
import { MonthlyReportsComponent } from './pages/monthly-reports/monthly-reports.component';
import { OrganizationsComponent } from './pages/organizations/organizations.component';
import { UserComponent } from './pages/user/user.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { ManageAdminsComponent } from './pages/manage-admins/manage-admins.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FeedbackComponent,
    SelectedStudentsComponent,
    NotSelectedStudentsComponent,
    MonthlyReportsComponent,
    OrganizationsComponent,
    UserComponent,
    RequestsComponent,
    ManageAdminsComponent,
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class AdminLayoutModule { }



