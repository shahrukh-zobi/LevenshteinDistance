import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, public jwtHelper: JwtHelperService) { }

  login(username, password) {
    return this.httpClient.post<any>(environment.apiUrl + "account/login", { Username: username, Password: password });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    //check weather the token is expired or not
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken() {
    return localStorage.getItem('authToken') ? localStorage.getItem('authToken') : "";
  }
}
