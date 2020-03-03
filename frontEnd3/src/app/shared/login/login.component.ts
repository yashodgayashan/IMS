import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  userType:string='null';
  // const match;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }
  onSubmit() {
    if (this.username == '' || this.password == '') {
      // this.sendNotification1();
      return;
    }
    localStorage.setItem('username', this.username);
    this.userType=this.loginService.getUserType(this.username);
    console.log("inside student login component"+ this.userType+"this.userType");
    this.loginService.getData(this.username, this.password, this.userType)
      .subscribe(
        // (data: match) => {
        //   this.match = data;
        // }
        data => {
          console.log('Observer got a next value: ' + data);
          if(data=="1" && this.userType=="Student"){
            this.router.navigate(['/student/dashboard']);
          }else if(data=="1" && this.userType=="Admin"){
            this.router.navigate(['/admin/dashboard']);
          }else if(data=="1" && this.userType=="Company"){
            this.router.navigate(['/company/dashboard']);
          }else{
            this.router.navigate(['/login']);
          }
        },
        err => console.error('Observer got an error: ' + err),
        () => console.log('Observer got a complete notification')
      );
  }
}
