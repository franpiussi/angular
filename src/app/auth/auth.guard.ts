import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService : LoginService,private route: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      let url : string = state.url
      return this.checkLogin(url)
  }

  checkLogin(url : string) : boolean {
    console.log('Esta logueado: ' + this.loginService)
    if(this.loginService.token) { return true }
    this.loginService.redirectUrl = url;
    this.route.navigate(['/login']);
    return false;
  }
  
}
