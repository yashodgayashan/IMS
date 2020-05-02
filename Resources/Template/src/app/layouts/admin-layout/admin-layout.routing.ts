import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { TableComponent } from './pages/table/table.component';
import { TypographyComponent } from './pages/typography/typography.component';
import { IconsComponent } from './pages/icons/icons.component';
import { MapsComponent } from './pages/maps/maps.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { UpgradeComponent } from './pages/upgrade/upgrade.component';
import { SelectedStudentsComponent } from './pages/selected-students/selected-students.component';
import { NotSelectedStudentsComponent } from './pages/not-selected-students/not-selected-students.component';
import { OrganizationsComponent } from './pages/organizations/organizations.component';
import { MonthlyReportsComponent } from './pages/monthly-reports/monthly-reports.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',            component: DashboardComponent },
    { path: 'user',                 component: UserComponent },
    { path: 'table',                component: TableComponent },
    { path: 'typography',           component: TypographyComponent },
    { path: 'icons',                component: IconsComponent },
    { path: 'maps',                 component: MapsComponent },
    { path: 'notifications',        component: NotificationsComponent },
    { path: 'upgrade',              component: UpgradeComponent },
    { path: 'upgrade',              component: UpgradeComponent },
    { path: 'selectedStudents',     component: SelectedStudentsComponent },
    { path: 'notSelectedStudents',  component: NotSelectedStudentsComponent },
    { path: 'organizations',        component: OrganizationsComponent },
    { path: 'monthlyReports',       component: MonthlyReportsComponent },
    { path: 'feedback',             component: FeedbackComponent },
];
