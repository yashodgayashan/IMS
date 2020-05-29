import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyLayoutRoutingModule } from './company-layout-routing.module';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [DashboardComponent, StudentListComponent, ProfileComponent],
  imports: [
    CommonModule,
    CompanyLayoutRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class CompanyLayoutModule { }


