import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  
  currentUser: User;

  constructor( private router: Router,private authenticationService: AuthenticationService ) {}

  // logout() {
  //     this.authenticationService.logout();
  //     this.router.navigate(['/login']);
  // }
  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  // ngOnDestroy() {
  //   this.currentUser.unsubscribe();
  // }
  
}
export class User {
  id: number;
  username: string;
  password: string;
  token?: string;
}