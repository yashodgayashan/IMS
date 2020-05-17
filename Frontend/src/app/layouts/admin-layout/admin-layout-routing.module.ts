import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { SelectedStudentsComponent } from './pages/selected-students/selected-students.component';
import { NotSelectedStudentsComponent } from './pages/not-selected-students/not-selected-students.component';
import { OrganizationsComponent } from './pages/organizations/organizations.component';
import { MonthlyReportsComponent } from './pages/monthly-reports/monthly-reports.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { ManageAdminsComponent } from './pages/manage-admins/manage-admins.component';


const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',            component: DashboardComponent },
    { path: 'user',                 component: UserComponent },
    { path: 'selectedStudents',     component: SelectedStudentsComponent },
    { path: 'notSelectedStudents',  component: NotSelectedStudentsComponent },
    { path: 'organizations',        component: OrganizationsComponent },
    { path: 'monthlyReports',       component: MonthlyReportsComponent },
    { path: 'feedback',             component: FeedbackComponent },
    { path: 'requests',             component: RequestsComponent },
    { path: 'manageAdmins',         component: ManageAdminsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(AdminLayoutRoutes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }