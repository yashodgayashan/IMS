import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Student} from 'src/app/layouts/admin-layout/models/student.model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students : Student[];
  constructor(private http: HttpClient) { }

  // const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('//localhost:8080/student/students')
  }
}

