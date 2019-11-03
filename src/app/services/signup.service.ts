import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = { headers: new HttpHeaders({ 'Content-Type': 'Application/json' }) }

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http : HttpClient) { }

  signUp(user): Promise<any> {
    let body = JSON.stringify(user)
    return this.http.post('https://utn2019-avanzada2-tp8.herokuapp.com/sign-up',body,headers).toPromise()
  }

  checkEmailNotTaken(email : string) : Observable<any> {
    return this.http.get<any[]>(`https://utn2019-avanzada2-tp8.herokuapp.com/users/identities?email=${email}`)
  }
}
