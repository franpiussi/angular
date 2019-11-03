import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { CustomValidator } from 'src/app/custom-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  logInForm : FormGroup
  user = new User()
  
  constructor(private loginService : LoginService, private route : Router) { }

  ngOnInit() {
    this.logInForm = new FormGroup({
      "email" : new FormControl(this.user.email, [Validators.required,CustomValidator.checkIfEmail()],[CustomValidator.checkIfEmailTakenLogin(this.loginService)]),
      "password" : new FormControl(this.user.password, [Validators.required])
    })
  }

  
  onSubmit() {
    this.user = <User> this.logInForm.value
    this.loginService.login(this.user)
    .subscribe(
      response => {
        this.loginService.token = response['jwt'];
        console.log(this.loginService.token);
        if(this.loginService.token){
          let redirect = this.loginService.redirectUrl ? this.route.parseUrl(this.loginService.redirectUrl) : '/home'
          this.route.navigateByUrl(redirect)
      }
      }, ()=> alert("ALGO ESTA PASANDO"))
  }

  get email(){
    return this.logInForm.get("email")
  }

  get password(){
    return this.logInForm.get("password")
  }

  goToSignUp(){
    this.route.navigate(['./signup']);
  }

}
