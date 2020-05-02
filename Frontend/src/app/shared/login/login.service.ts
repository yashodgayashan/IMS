import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/app/auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private authService :AuthenticationService) { }
  // getData(uname:String,password:String,type:String):Observable<string>{
  //   return this
  //             .http
  //             .get<string>('//localhost:3000/todosStaff/'+uname);  
  // }
  getData(uname: String, password: String, type: String) {
    return this
      .http
      .post('//localhost:8080/login/user',
        {
          "id": uname,
          "password": password,
          "type": type
        });
  }
  
  getUserType(id:string):string{
    //check if id belongs to a student.
    //if id contains number user most likely to be a student.
    var studentCheck = /^[0-9]+[A-Za-z]/;

    //check if id belongs to a admin.
    //if id contains "-a" user is an admin.
    var adminCheck = /^[A-Za-z]+-[a]/;

    if(studentCheck.test(id)){
      return "Student"
    }else if(adminCheck.test(id)){
      return "Admin";
    }
    return "Company";
  }
}
