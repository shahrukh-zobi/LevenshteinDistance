import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isError: boolean = false;
  username: string = "admin";
  password: string = "admin";
  errorMessage: string = "";

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
    localStorage.removeItem("authToken");
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(response => {
      this.isError = false;
      this.errorMessage = "";
      let token = response.token;
      localStorage.setItem("authToken", token.toString());
      this.router.navigate(['minimum-distance']);
    }, error => {
      this.isError = true;
      if (error.status == 0) {
        this.errorMessage = "Connection Timeout (API is not up)!";
        return;
      }
      this.errorMessage = "Please enter valid username and password";
      console.log(error);
    });
  }
}
