import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import 'rxjs/add/operator/map';
import { TabsModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage: string ;

  constructor(private auth: AuthService) { 
  }

  onLoginSubmit(credentials) {
    // call the login method on the AuthService
    // and call finishAuthentication if successful,
    // or display an error if unsuccessful
    this.auth.login(credentials)
    .map(res => res.json())
    .subscribe(response => {
      console.log(response)
      this.auth.finishAuthentication(response.token)
    }, err => this.errorMessage = err.json().message)
  }

  onSignupSubmit(credentials) {
    // call the signup method on the AuthService
    // and call finishAuthentication if successful,
    // or display an error if unsuccessful
    this.auth.signup(credentials)
    .map(res => res.json())
    .subscribe(response => {
      this.auth.finishAuthentication(response.token)
    }, err => this.errorMessage = err.json().message)
  }
}
