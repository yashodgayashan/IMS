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
  // const match;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }
  adminLogin() {

  }
  signup() {

  }
  onSubmit() {
    if (this.username == '' || this.password == '') {
      // this.sendNotification1();
      return;
    }
    console.log("inside student login component");

    this.loginService.getData('164124V', '123', 'Student')
      .subscribe(
        // (data: match) => {
        //   this.match = data;
        // }
        data => {
          console.log('Observer got a next value: ' + data);
          if(data=="1"){
            this.router.navigate(['/admin/dashboard']);
          }
        },
        err => console.error('Observer got an error: ' + err),
        () => console.log('Observer got a complete notification')
      );
  }
}
