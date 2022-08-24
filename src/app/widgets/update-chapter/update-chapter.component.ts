import { Component, OnInit } from '@angular/core';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-update-chapter',
  templateUrl: './update-chapter.component.html',
  styleUrls: ['./update-chapter.component.css']
})
export class UpdateChapterComponent implements OnInit {

  subject:string = "";
  standard:string = "";
  chapterNo:string = "";
  startDate:string = "";
  formStatus:boolean = false;

  constructor(private educationService: EducationService) { }

  onUpload() {
    if(!this.validateInfo(this.subject, this.standard))return;

    this.educationService.updateChapterDate(this.subject, this.standard,this.chapterNo,this.startDate).subscribe(data => {
      console.log(data);
      this.formStatus = true;
    })

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
