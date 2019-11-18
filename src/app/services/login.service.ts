import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';


const headers = { headers: new HttpHeaders({ 'Content-Type': 'Application/json' }) }

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token = undefined
  redirectUrl: string

  constructor(private http : HttpClient) { }

  login(user : User): Observable<any> {
    let body = JSON.stringify(user)
    const observable = this.http.post('https://utn2019-avanzada2-tp8.herokuapp.com/login',body,headers)

    observable.subscribe(response => {
      this.token = response['jwt'];
      localStorage.setItem('token', this.token);
    },
    error => {console.log("error login")})
    return observable
  }

  checkEmailNotTaken(email : string) : Observable<any> {
    return this.http.get<any[]>(`https://utn2019-avanzada2-tp8.herokuapp.com/users/identities?email=${email}`)
  }

  logout() : void {
    this.token = undefined;
  }

}
