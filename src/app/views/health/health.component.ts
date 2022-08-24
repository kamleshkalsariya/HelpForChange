import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {

  doctorList:any[]= [];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getDoctorList();
  }

  getDoctorList():void{
    this.userService.getDoctorList().subscribe(data =>{this.doctorList = data.Items});
  }

}
