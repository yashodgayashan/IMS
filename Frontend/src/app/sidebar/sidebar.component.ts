import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',           title: 'Dashboard',             icon:'nc-bank',       class: '' },
    { path: '/selectedStudents',    title: 'Selected Students',     icon:'nc-diamond',    class: '' },
    { path: '/notSelectedStudents', title: 'Remaining Students',   icon:'nc-diamond',    class: '' },
    { path: '/organizations',       title: 'organizations',         icon:'nc-diamond',    class: '' },
    { path: '/monthlyReports',      title: 'monthly Reports',        icon:'nc-diamond',    class: '' },
    { path: '/feedback',            title: 'feedback',              icon:'nc-diamond',    class: '' },
    { path: '/icons',               title: 'Icons',             icon:'nc-diamond',    class: '' },
    { path: '/maps',                title: 'Maps',              icon:'nc-pin-3',      class: '' },
    { path: '/notifications',       title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user',                title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/table',               title: 'Table List',        icon:'nc-tile-56',    class: '' },
    { path: '/typography',          title: 'Typography',        icon:'nc-caps-small', class: '' },
    { path: '/upgrade',             title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
