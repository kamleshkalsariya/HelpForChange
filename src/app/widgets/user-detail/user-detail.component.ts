import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private userService:UserService,private educationService:EducationService) { }

  fname:string = "";
  userID:any= window.localStorage.getItem('userID');
  email:any = window.localStorage.getItem('email');
  mobileNo:string = "";
  occupation:string = "";
  files: File[] = [];
  formStatus:boolean = false;


  onChange(event:any) {
    console.log(event.target.files);
    this.files = event.target.files;
    console.log("file is:", this.files);
  }

  onUpload() {

    this.userService.updateUser(this.userID, this.fname,this.email,this.mobileNo,this.occupation,this.files).subscribe(data => {
      console.log(data);
      this.formStatus = true;
    })

    
    if(this.files != []){
        let file = this.files[0];
        let extension = file.type.split("/");
        let type = extension[extension.length - 1];
        console.log("type of file: ", type);
        let id = "user";
  
        this.educationService.getUploadURL(this.userID, type,id,this.fname,this.email).subscribe(data => {
          //data = JSON.parse(data);
          const uploadURL = data.uploadURL;
  
          this.educationService.postImageOnS3(uploadURL, file, type).subscribe(data => {
            console.log(data);
            if(data != null)window.alert("Something went wrong");
          })
        })
      }

    // window.alert("subject added successfully");
  }

  ngOnInit(): void {
  }

}
