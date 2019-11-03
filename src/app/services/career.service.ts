import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = { headers: new HttpHeaders({ 'Content-Type': 'Application/json' }) }

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http : HttpClient ) { }

  getAll(): Observable<any> {
    return this.http.get('https://utn2019-avanzada2-tp8.herokuapp.com/api/careers')
  }

}
