import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';

// interface formDataInterface {
//   "email": string;
//   [key: string]: string;
// };

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading: boolean = false;
  isConfirm: boolean = false;
  email_address: string = '';
  password: string = '';
  verificationCode: string = '';
  showPassword: boolean = false;
  failed_registration:boolean = false;
  constructor(private auth: AuthService, private router: Router) { 
    
  }

  ngOnInit(): void {
  }

  onSignup() {
      this.loading = true;
      console.log(this.email_address, this.password);
      var poolData = {
        UserPoolId: environment.userPoolId, // Your user pool id here
        ClientId: environment.userPoolWebClientId // Your client id here
      };
      var userPool = new CognitoUserPool(poolData);
      var attributeList: CognitoUserAttribute[] = [];

      userPool.signUp(this.email_address, this.password, attributeList, [], (err,result) => {
        this.loading = false;
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        else{
          this.isConfirm = true;
        }
      });
  }

  confirmSignUp() {
    console.log(this.email_address, this.verificationCode);
    this.loading = true;
    var poolData = {
      UserPoolId: environment.userPoolId, // Your user pool id here
      ClientId: environment.userPoolWebClientId // Your client id here
    };

    var userPool = new CognitoUserPool(poolData);
    const confirm = {
      Username: this.email_address,
      Pool: userPool
    };
    const CU = new CognitoUser(confirm);
    CU.confirmRegistration(this.verificationCode,true,(err, result)=> {
          if (err) {
            this.loading = false;
          }
          else{
            this.loading = false;
            this.router.navigate(['/signIn']);
          }
    });
  }
}

