import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs';

const headers = { headers: new HttpHeaders({ 'Content-Type': 'Application/json' }) }

@Injectable({
  providedIn: 'root'
})
export class AsyncstudentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('https://utn2019-avanzada2-tp8.herokuapp.com/api/students')
  }

  getById(studentId): Observable<any> {
    return this.http.get('https://utn2019-avanzada2-tp8.herokuapp.com/api/students/' + studentId)
  }

  add(student): Observable<any> {
    let body = JSON.stringify(student);
    return this.http.post('https://utn2019-avanzada2-tp8.herokuapp.com/api/students', body, headers)
  }

  patch(student: Student): Observable<any> {
    let body = JSON.stringify(student);
    console.log(body);
    return this.http.patch('https://utn2019-avanzada2-tp8.herokuapp.com/api/students/'+student.studentId, body, headers)
  }
  deleteById(studentId : number) : Observable<any> {
    return this.http.delete('https://utn2019-avanzada2-tp8.herokuapp.com/api/students/'+studentId)
  }



}
