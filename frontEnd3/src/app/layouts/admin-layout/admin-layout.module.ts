import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from './pages/dashboard/dashboard.component';
// import { UserComponent }            from './pages/user/user.component';
// import { TableComponent }           from './pages/table/table.component';
// import { TypographyComponent }      from './pages/typography/typography.component';
// import { IconsComponent }           from './pages/icons/icons.component';
// import { MapsComponent }            from './pages/maps/maps.component';
// import { NotificationsComponent }   from './pages/notifications/notifications.component';
// import { UpgradeComponent }         from './pages/upgrade/upgrade.component';
// import { SelectedStudentsComponent } from './pages/selected-students/selected-students.component';
// import { NotSelectedStudentsComponent } from './pages/not-selected-students/not-selected-students.component';
// import { OrganizationsComponent } from './pages/organizations/organizations.component';
// import { MonthlyReportsComponent } from './pages/monthly-reports/monthly-reports.component';
// import { FeedbackComponent } from './pages/feedback/feedback.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { SelectedStudentsComponent } from './pages/selected-students/selected-students.component';
import { NotSelectedStudentsComponent } from './pages/not-selected-students/not-selected-students.component';
import { MonthlyReportsComponent } from './pages/monthly-reports/monthly-reports.component';
import { OrganizationsComponent } from './pages/organizations/organizations.component';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FeedbackComponent,
    SelectedStudentsComponent,
    NotSelectedStudentsComponent,
    MonthlyReportsComponent,
    OrganizationsComponent,
    UserComponent,
    // UserComponent,
    // TableComponent,
    // UpgradeComponent,
    // TypographyComponent,
    // IconsComponent,
    // MapsComponent,
    // NotificationsComponent,
    // SelectedStudentsComponent,
    // NotSelectedStudentsComponent,
    // OrganizationsComponent,
    // MonthlyReportsComponent,
    // FeedbackComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    // RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ]
})
export class AdminLayoutModule { }


