import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login/login.service';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ADMINROUTES: RouteInfo[] = [
  { path: '/admin/dashboard',           title: 'Dashboard',         icon: 'nc-bank',      class: '' },
  { path: '/admin/selectedStudents',    title: 'Selected Students', icon: 'nc-diamond',   class: '' },
  { path: '/admin/notSelectedStudents', title: 'Remaining Students',icon: 'nc-diamond',   class: '' },
  { path: '/admin/organizations',       title: 'organizations',     icon: 'nc-diamond',   class: '' },
  { path: '/admin/monthlyReports',      title: 'monthly Reports',   icon: 'nc-diamond',   class: '' },
  { path: '/admin/feedback',            title: 'feedback',          icon: 'nc-diamond',   class: '' },
  { path: '/admin/requests',            title: 'requests',          icon:'nc-diamond',    class: '' },
  { path: '/admin/manageAdmins',        title: 'Manage Admins',     icon:'nc-pin-3',      class: '' },
  { path: '/admin/user',                title: 'User Profile',      icon: 'nc-single-02', class: '' },
  ];
export const STUDENTROUTES: RouteInfo[] = [
  { path: '/student/dashboard',         title: 'Dashboard',         icon: 'nc-bank',      class: '' },
  { path: '/student/selectedStudents',  title: 'Selected Students', icon: 'nc-diamond',   class: '' },
];
export const COMPANYROUTES: RouteInfo[] = [
  { path: '/company/dashboard',         title: 'Dashboard',         icon: 'nc-bank',      class: '' },
  { path: '/company/Students',          title: 'Selected Students', icon: 'nc-diamond',   class: '' },
  { path: '/company/Students',          title: 'Selected Students', icon: 'nc-diamond',   class: '' },

];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userType:string='';
  constructor(private loginService: LoginService) { }

  public menuItems: any[];
  ngOnInit(): void {
    this.userType=this.loginService.getUserType(localStorage.getItem("username"));
    
    if(this.userType=="Student"){
      this.menuItems = STUDENTROUTES.filter(menuItem => menuItem);
    }else if(this.userType=="Admin"){
      this.menuItems = ADMINROUTES.filter(menuItem => menuItem);
    }else if(this.userType=="Company"){
      this.menuItems = COMPANYROUTES.filter(menuItem => menuItem);
    }else{
      
    }
  }

}
