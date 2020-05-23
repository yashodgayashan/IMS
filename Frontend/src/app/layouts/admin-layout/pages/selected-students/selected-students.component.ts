import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { Student} from 'src/app/layouts/admin-layout/models/student.model';

@Component({
  selector: 'app-selected-students',
  templateUrl: './selected-students.component.html',
  styleUrls: ['./selected-students.component.scss']
})
export class SelectedStudentsComponent implements OnInit {
  students: Student[];
  constructor(private stuService: StudentService) { }

  ngOnInit(): void {
    this.stuService.getAllStudents().subscribe(data => {
      this.students = data;
    });
  }
}
