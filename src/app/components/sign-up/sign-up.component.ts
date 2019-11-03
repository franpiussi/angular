import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { SignupService } from 'src/app/services/signup.service';
import { CustomValidator } from 'src/app/custom-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm : FormGroup
  user = new User() 
  constructor(private signUpService : SignupService,private route : Router) { }

  ngOnInit() {
    this.signUpForm = new FormGroup ({
      "email" : new FormControl(this.user.email, [Validators.required,CustomValidator.checkIfEmail()],[CustomValidator.checkIfEmailNotTakenSignUp(this.signUpService)]),
      "password" : new FormControl(this.user.password, [Validators.required])
    })
  }
  
  onSubmit(){
      this.user = <User> this.signUpForm.value;
      this.signUpService.signUp(this.user)
      .then(()=> alert('Registro con Exito!'))
      .catch(()=> alert('Error en Registro!'))
      this.signUpForm.reset();
  }

  get email(){
    return this.signUpForm.get("email");
  }

  get password(){
    return this.signUpForm.get("password")
  }

  goToLogIn(){
    this.route.navigate(['./login']);
  }
}
