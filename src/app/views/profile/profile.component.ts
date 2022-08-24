import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  requestList:any[] = [];
  userData:any = {};
  userID:any = window.localStorage.getItem('userID');
  email:any = window.localStorage.getItem('email');
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getUser(this.userID);
    this.getUserRequest(this.userID);
  }

  getUserRequest(userID:any):void{
    this.userService.getUserRequest(userID).subscribe(data =>{this.requestList = data.Items.slice(0,8)});
  }

  getUser(userID:any):void{
    this.userService.getUser(userID).subscribe(data =>{this.userData = data.Item});
  }
  
}
