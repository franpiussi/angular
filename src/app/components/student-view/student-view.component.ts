import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncstudentService } from 'src/app/services/asyncstudent.service';
import { CareerService } from 'src/app/services/career.service';
import { Career } from 'src/app/models/career';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  private student: Student
  careers = new Array<Career>()
  constructor(private asyncStudentService: AsyncstudentService, private route: ActivatedRoute, private careerService: CareerService) { }

  ngOnInit() {
    let studentId = Number(this.route.snapshot.paramMap.get('id'))
    this.asyncStudentService.getById(studentId)
      .subscribe(response => { this.student = response}, error => {console.log(error.message)})
    this.careerService.getAll()
      .subscribe(response => { this.careers = response as Career[]},error => {console.log(error.message)})
  }

  editStudent() {
    this.asyncStudentService.patch(this.student).subscribe(()=> {alert("Modificado con exito!")}, error => {console.log(error.message)})
  }

}
