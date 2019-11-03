import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students = new Array<Student>();
  studentId = 0;
  constructor() { }

  add(student: Student) {
    this.studentId++;
    student.studentId = this.studentId;
    this.students.push(student);
  }

  getAll() {
    return this.students;
  }

  getById(studentId) {
    let studentList = this.students.filter(student => {
      return student.studentId = studentId;
    })
    return (studentList.length > 0) ? studentList[0] : null;
  }

  deleteById(studentId) {
    this.students = this.students.filter(student => {
      return student.studentId != studentId;
    })
  }
}
