import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
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
}
