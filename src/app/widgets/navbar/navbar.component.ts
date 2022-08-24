import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    let poolData = {
      UserPoolId: environment.userPoolId, // Your user pool id here
      ClientId: environment.userPoolWebClientId // Your client id here
    };
    let userPool = new CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();
    cognitoUser?.signOut();
    window.localStorage.clear();
    this.router.navigate(["/home"])
  }
}
