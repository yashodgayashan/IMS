import { Component, OnInit } from '@angular/core';
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/admin/dashboard',           title: 'Dashboard',             icon:'nc-bank',       class: '' },
  { path: '/admin/selectedStudents',    title: 'Selected Students',     icon:'nc-diamond',    class: '' },
  { path: '/admin/notSelectedStudents', title: 'Remaining Students',   icon:'nc-diamond',    class: '' },
  { path: '/admin/organizations',       title: 'organizations',         icon:'nc-diamond',    class: '' },
  { path: '/admin/monthlyReports',      title: 'monthly Reports',        icon:'nc-diamond',    class: '' },
  { path: '/admin/feedback',            title: 'feedback',              icon:'nc-diamond',    class: '' },
  { path: '/admin/icons',               title: 'Icons',             icon:'nc-diamond',    class: '' },
  { path: '/admin/maps',                title: 'Maps',              icon:'nc-pin-3',      class: '' },
  { path: '/admin/notifications',       title: 'Notifications',     icon:'nc-bell-55',    class: '' },
  { path: '/admin/user',                title: 'User Profile',      icon:'nc-single-02',  class: '' },
  { path: '/admin/table',               title: 'Table List',        icon:'nc-tile-56',    class: '' },
  { path: '/admin/typography',          title: 'Typography',        icon:'nc-caps-small', class: '' },
  { path: '/admin/upgrade',             title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  public menuItems: any[];
    ngOnInit():void {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

}
