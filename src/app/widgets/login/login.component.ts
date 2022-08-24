import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;
  login_failed:boolean = false;
  email_address: string = "";
  password: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSignIn(form: NgForm){
    if (form.valid) {
      this.isLoading = true;
      console.log(this.email_address,this.password)
      let authenticationDetails = new AuthenticationDetails({
          Username: this.email_address,
          Password: this.password,
      });
     
      let poolData = {
        UserPoolId: environment.userPoolId, // Your user pool id here
        ClientId: environment.userPoolWebClientId // Your client id here
      };

      let userPool = new CognitoUserPool(poolData);
      let userData = {
        Username: this.email_address,
        Pool: userPool,
      };
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          var user = userPool.getCurrentUser();
          if (user != null) {
              var userName = user.getUsername();
              window.localStorage.setItem('userID',userName);
              window.localStorage.setItem('email',this.email_address);
          }
          this.router.navigate(["/home"])
        },
      
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err));
          this.isLoading = false;
          this.login_failed = true;
        },
      });

    }
    else{
      console.log("invalid")
    }
  }
  

}
