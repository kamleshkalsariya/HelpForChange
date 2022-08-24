import { Component, OnInit ,ViewChild} from '@angular/core';
import { Columns, API, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private educationService: EducationService) { }

  @ViewChild('table', { static: true })
  table!: APIDefinition;

  public configuration!: Config;
  public columns: Columns[] = [
    { key: 'type', title: "Request Type" },
    { key: 'name', title: "Name" },
    { key: 'mobileNo', title: 'Mobile No.' },
    { key: 'subject', title: 'Subject/Food Type' },
    { key: 'standard', title: 'Standard' },
    { key: 'chapterName', title: 'ChName/Food'},
    { key:'StartDate',title:'Start Date'},
    { key: 'status', title: 'Request Status'},
    { key: 'permission', title: 'permission'},
  ];
  public data : any[] = [];
  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.checkboxes = false;
    this.configuration.orderEnabled = true;
    this.configuration.threeWaySort = true;
    this.educationService.getAllRequest().subscribe(request =>{this.data=request.Items;});
  }

  updateChapterTable(row:any) {
    this.educationService.updateChapterStatus(row).subscribe(data => {
      console.log(data);
      window.alert("Assigned successfully");
    })
  }

  updateUserTable(row:any) {
    this.educationService.updateUserStatus(row).subscribe(data => {
      console.log(data);
    })
  }

}
