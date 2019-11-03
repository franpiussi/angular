import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Student } from 'src/app/models/student';
import { Career } from 'src/app/models/career';
import { StudentDto } from 'src/app/models/student-dto';
import { AsyncstudentService } from 'src/app/services/asyncstudent.service';
import { CareerService } from 'src/app/services/career.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  faTimes = faTimes
  studentsDto = new Array<StudentDto>()
  students = new Array<Student>()
  careers = new Array<Career>()
  constructor(private asyncStudentService: AsyncstudentService, private careerService: CareerService) { }

  ngOnInit() {
    //this.students = this.studentService.getAll();
    this.retrieveData()
  }
  mergeData() {
    this.students.forEach(element => {
      this.studentsDto.push({
        studentId: element.studentId,
        firstName: element.firstName,
        lastName: element.lastName,
        dni: element.dni,
        address: element.address,
        email: element.email,
        careerName : this.findCareer(element.careerId)
      });
    })
  }

  findCareer(careerId : number){
    let career = this.careers.find(e=>e.careerId===careerId)
    if(career === undefined){
      return "No Career"
    }
    else{
      return career.name
    }
  }

  deleteStudent(studentId : number){
    this.asyncStudentService.deleteById(studentId).subscribe(data=> console.log(data))
    this.retrieveData();
  }

  retrieveData(){
    this.asyncStudentService.getAll()
      .subscribe(response => {
          this.students = response as Student[]
      },
      error => {
        console.log(error.message)
      })
      this.careerService.getAll()
      .subscribe(response => {
          this.careers = response as Career[]
          this.mergeData()
      },
      error => {
        console.log(error.message)
      })
  }
}
