import { NumberInput } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  constructor(private educationService:EducationService) { }

  subject:string = "";
  standard:string = "";
  files: File[] = [];
  formStatus:boolean = false;


  onChange(event:any) {
    console.log(event.target.files);
    this.files = event.target.files;
    console.log("file is:", this.files);
  }

  onUpload() {
    console.log(this.subject, this.standard,this.files);
    if(!this.validateInfo(this.subject, this.standard))return;

    this.educationService.addsubject(
      this.subject, this.standard,this.files).subscribe(data => {
      console.log(data);
      this.formStatus = true;
    })

    
    if(this.files != []){
        let file = this.files[0];
        let extension = file.type.split("/");
        let type = extension[extension.length - 1];
        console.log("type of file: ", type);
        let imageID = this.subject.toLowerCase()+"_"+this.standard;
        let id = "subjectImage";
  
        this.educationService.getUploadURL(imageID, type,id,this.subject,this.standard).subscribe(data => {
          //data = JSON.parse(data);
          const uploadURL = data.uploadURL;
          console.log(uploadURL);
  
          this.educationService.postImageOnS3(uploadURL, file, type).subscribe(data => {
            console.log(data);
            if(data != null)window.alert("Something went wrong");
          })
        })
      }

    //window.alert("subject added successfully");
  }

  validateInfo(subject: string, standard: string){
    if(subject == undefined || subject == "")window.alert("subject is required");
    else if(standard == undefined || standard == "")window.alert("standard is required");
    else return true;
    return false;
  }

  ngOnInit(): void {
  }

}
