import { Component, OnInit } from '@angular/core';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  constructor(private educationService:EducationService) { }

  subject:any[]=[];
  allSubject:any[]=['Maths','Science','English','Hindi','Social Science'];
  selectedSubject:string = "";

  ngOnInit(): void {
    this.getAllsubject();
  }

  getAllsubject():void{
    this.educationService.getAllSubject().subscribe(data =>{
      data.Items.sort(() => (Math.random() > .5) ? 1 : -1);
      this.subject = data.Items.slice(0,8)
    });
  }

  onApply(subjectID:string,standards:string,standarde:string):void{
    if(subjectID == "All"){window.alert("Subject is Invalid");}
    if(standards == "All" && standarde == "All"){standards = "1";standarde = "10";}
    else if(standarde == "All"){standarde = "10";}
    else if(standards == "All"){standards = "8";}
    this.educationService.getSubject(subjectID,standards,standarde).subscribe(data =>{
      console.log(data);
      this.subject = data.Items;
    });
  }

}
