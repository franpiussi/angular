import { ValidatorFn, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { SignupService } from './services/signup.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './services/login.service';

export class CustomValidator {
    static checkIfEmail(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const email = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(gmail|hotmail|icloud|google)\.com$/.test(control.value);
            return email ? null : { 'notEmail': { value: control.value } };
        }
    }

    static checkIfEmailNotTakenSignUp(signUpService : SignupService): AsyncValidatorFn {
        return (control: AbstractControl) : Observable<ValidationErrors | null> => {
            const email = control.value.toLowerCase()
            return signUpService.checkEmailNotTaken(email).pipe(
                map(() => {
                    return null ;
                }),
                catchError(()=> of({ 'emailTaken' : { value : true }}))
            )
        }
    }
    

    static checkIfEmailTakenLogin(loginService : LoginService): AsyncValidatorFn {
        return (control: AbstractControl):  Observable<{[key: string]: any} | null> => {
            const email = control.value.toLowerCase()
            return loginService.checkEmailNotTaken(email).pipe(
                map(() => {
                    return { 'emailNotExist' : { value : true }}
                }),
                catchError(()=> of(null))
            )
        }
    }


}

/*.*/