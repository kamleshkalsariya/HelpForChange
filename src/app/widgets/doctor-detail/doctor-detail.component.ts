import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {

  constructor(private userService:UserService,private educationService:EducationService) { }

  fname:string = "";
  userID:any= window.localStorage.getItem('userID');
  mobileNo:string = "";
  degree:string = "";
  fos:string = "";
  address:string = "";
  service:string = "";
  files: File[] = [];
  formStatus:boolean = false;


  onChange(event:any) {
    console.log(event.target.files);
    this.files = event.target.files;
    console.log("file is:", this.files);
  }

  onUpload() {

    this.userService.addDoctorProfile(this.userID, this.fname,this.mobileNo,this.degree,this.fos,this.address,this.service,this.files).subscribe(data => {
      console.log(data);
      this.formStatus = true;
    })

    
    if(this.files != []){
        let file = this.files[0];
        let extension = file.type.split("/");
        let type = extension[extension.length - 1];
        console.log("type of file: ", type);
        let id = "doctor";
  
        this.educationService.getUploadURL(this.userID, type,id,this.fname,this.degree).subscribe(data => {
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
