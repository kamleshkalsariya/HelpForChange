import { Component, OnInit } from '@angular/core';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-donate-food',
  templateUrl: './donate-food.component.html',
  styleUrls: ['./donate-food.component.css']
})
export class DonateFoodComponent implements OnInit {

  type:string = "";
  date:string = "";
  foodItems:string = "";
  fullName:string = "";
  mobileNo:string = "";
  userID:any = window.localStorage.getItem('userID');
  formStatus:boolean = false;

  constructor(private educationService:EducationService) { }

  ngOnInit(): void {
  }

  onUpload() {
    if(!this.validateInfo(this.fullName,this.mobileNo))return;
    this.educationService.requestFood(this.userID,this.type, this.date,this.foodItems,this.fullName,this.mobileNo).subscribe(data => {
      console.log(data);
      this.formStatus = true;
    })
  }

  validateInfo(fullName: string,mobileNo: string){
    if(fullName == undefined || fullName == "")window.alert("Name is required");
    else if(mobileNo == undefined || mobileNo == "")window.alert("mobileNo is required");
    else return true;
    return false;
  }
}
