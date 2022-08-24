import { Injectable } from '@angular/core';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  cognitoUser: any;

  constructor() { }

  isLoggedIn(): boolean {
    var isAuth = false;

    let poolData = {
      UserPoolId: environment.userPoolId, // Your user pool id here
        ClientId: environment.userPoolWebClientId // Your client id here
    };

    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      console.log(cognitoUser.getUsername());
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
        }
        isAuth = session.isValid();
      })
    }
    return isAuth;
  }

  isAdmin(): boolean {
    var isAdmin = false;

    let poolData = {
      UserPoolId: environment.userPoolId, // Your user pool id here
      ClientId: environment.userPoolWebClientId // Your client id here
    };

    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      var userName = cognitoUser.getUsername();
      console.log(userName);
      if(userName == "7e55bf30-8190-4028-bac7-5fb645260a32"){
        isAdmin = true;
      }
      else{
        window.alert("You are not an Admin.");
      }
    }
    return isAdmin;
  }

}
