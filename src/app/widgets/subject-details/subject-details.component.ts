import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EducationService } from 'src/app/services/education.service';


@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {

  constructor(private educationService:EducationService,private route: ActivatedRoute) { }

  @Input() chapterList?: any[];
  fullName:string = "";
  mobileNo:string = "";
  chapterNo:string = "";
  subject = String(this.route.snapshot.paramMap.get('subjectID'));
  standard = String(this.route.snapshot.paramMap.get('standard'));
  chapterName:string = "";
  startDate:string = "";
  userID:any = window.localStorage.getItem('userID');
  formStatus:boolean = false;

  ngOnInit(): void {
    this.getChapters();
  }

  getChapters():void{
    const subjectID = this.route.snapshot.paramMap.get('subjectID')+"_"+this.route.snapshot.paramMap.get('standard');
    this.educationService.getChapters(subjectID).subscribe(data =>{console.log(data);this.chapterList = data.Items});
  }

  onSelect(item:any){
    this.chapterNo = item.chapterNo;
    this.chapterName = item.chapterName;
    this.startDate = item.startDate;
  }

  onUpload() {
    if(!this.validateInfo(this.fullName,this.mobileNo))return;

    this.educationService.requestChapter(this.userID,this.fullName,this.mobileNo,this.chapterNo,this.chapterName,this.startDate,this.subject,this.standard).subscribe(data => {
      console.log(data);
      this.formStatus = true;
    })

    //window.alert("Form submitted successfully");
  }

  validateInfo(fullName: string,mobileNo: string){
    if(fullName == undefined || fullName == "")window.alert("Name is required");
    else if(mobileNo == undefined || mobileNo == "")window.alert("mobileNo is required");
    else return true;
    return false;
  }

}
