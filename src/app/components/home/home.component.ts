import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Home Page';
  constructor(private loginService : LoginService,private route: Router) { }

  ngOnInit() {
    
  }

  logout() : void{
    this.loginService.logout();

    setTimeout(() => {
      this.route.navigateByUrl('/login');      
    }, 2000);     
  }

}
