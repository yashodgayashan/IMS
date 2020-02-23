import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { CompanyLayoutComponent } from './layouts/company-layout/company-layout.component';

export const AppRoutes: Routes = [
  { path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, 
  { path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
  // {
  //   path: 'admin',
  //   pathMatch: 'full',
  //   component: AdminLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  //     }
  //   ]
  // },
  // {
  //   path: 'student',
  //   pathMatch: 'full',
  //   component: StudentLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: './layouts/student-layout/student-layout.module#StudentLayoutModule'
  //     }
  //   ]
  // },
  // {
  //   path: 'company',
  //   pathMatch: 'full',
  //   component: CompanyLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: './layouts/company-layout/company-layout.module#CompanyLayoutModule'
  //     }
  //   ]
  // }

]
