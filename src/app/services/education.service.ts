import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http: HttpClient) { }

  private awsURL = "https://esermi0hd0.execute-api.ap-south-1.amazonaws.com/default/Education";

  getAllSubject(): Observable<any> {
    let params = {
      type: "get",
      queryType: "getAllSubject",
    }

    return this.http.get<any>(this.awsURL, { params: params });
  }

  getSubject(subjectID: string,standards:string,standarde:string): Observable<any> {
    let params = {
      type: "get",
      queryType: "getSubject",
      subjectID: subjectID,
      standards: standards,
      standarde: standarde
    }

    return this.http.get<any>(this.awsURL, { params: params });
  }

  getChapters(subjectID: string): Observable<any> {
    let params = {
      type: "get",
      queryType: "getChapters",
      subjectID: subjectID
    }
    
    return this.http.get<any>(this.awsURL, { params: params });
  }

  getUploadURL(imageID: string, typeOfFile: string,id:string,subject:string,standard:string): Observable<any> {
    let params = {
      queryType: "getS3url",
      id : id,
      imageID: imageID,
      typeOfFile: typeOfFile,
      subject:subject,
      standard:standard
    }

    let url = "https://2awxxvffdd.execute-api.ap-south-1.amazonaws.com/default/test";
    return this.http.get<any>(url, { params: params });
  }

  postImageOnS3(_s3url: string, _file: File, typeOfFile: string): Observable<any> {
    let headers = {
      'Content-Type': `image/${typeOfFile}`
      //'x-amz-acl': 'public-read'
    }

    return this.http.put<any>(_s3url, _file, { headers: headers });
  }

  addsubject(subjectID:string,standard:string,files: File[]): Observable<any>{
    let params = {
      type: "post",
      queryType: "addSubject",
    }
    let body = null;
    if (files == undefined || files == null || files.length == 0) {
      body = {
        subjectID:subjectID,
        standard:standard,
      }
    }else{
      let file = files[0];
      let extension = file.type.split("/");
      let type = extension[extension.length - 1];
      let subjectName = subjectID.toLowerCase();
      let imageID = subjectName+"_"+standard;
      let imgURL = `https://hfc-web.s3.ap-south-1.amazonaws.com/education/std_${standard}/${subjectName}/${imageID}.${type}`;
      body = {
        subjectID:subjectID,
        standard:standard,
        imgURL:imgURL
      }
    }
    return this.http.post<any>(this.awsURL, JSON.stringify(body), { params: params });
  }

  addChapter(subject:string,standard:string,chapterNo:string,chapterName:string,noOfLecture:string,files: File[]): Observable<any>{
    let params = {
      type: "post",
      queryType: "addChapter",
    }
    let body = null;
    let subjectID = subject+"_"+standard;
    if (files == undefined || files == null || files.length == 0) {
      body = {
        subjectID:subjectID,
        chapterNo:chapterNo,
        chapterName:chapterName,
        noOfLecture:noOfLecture
      }
    }else{
      let file = files[0];
      let extension = file.type.split("/");
      let type = extension[extension.length - 1];
      let subjectName = subject.toLowerCase();
      let imageID = subjectName+"_"+standard+"_"+chapterNo;
      let pdfURL = `https://hfc-web.s3.ap-south-1.amazonaws.com/education/std_${standard}/${subjectName}/${imageID}.${type}`;
      body = {
        subjectID:subjectID,
        chapterNo:chapterNo,
        chapterName:chapterName,
        noOfLecture:noOfLecture,
        pdfURL:pdfURL
      }
    }
    return this.http.post<any>(this.awsURL, JSON.stringify(body), { params: params });
  }

  requestChapter(userID:any,name:string,mobileNo:string,chapterNo:string,chapterName:string,startDate:string,subject:string,standard:string): Observable<any>{
    let params = {
      type: "post",
      queryType: "requestChapter"
    }
    const body = {
      userID:userID,
      name:name,
      mobileNo:mobileNo,
      chapterNo:chapterNo,
      subject:subject,
      standard:standard,
      chapterName:chapterName,
      startDate:startDate
    }
    
    return this.http.post<any>(this.awsURL,JSON.stringify(body), { params: params });
  }

  requestFood(userID:any,type:string,date:string,foodItems:string,fullName:string,mobileNo:string): Observable<any>{
    let params = {
      type: "post",
      queryType: "requestFood"
    }
    const body = {
      userID:userID,
      fullName:fullName,
      mobileNo:mobileNo,
      type:type,
      foodItems:foodItems,
      date:date
    }
    
    return this.http.post<any>(this.awsURL,JSON.stringify(body), { params: params });
  }

  getAllRequest(): Observable<any> {
    let params = {
      type: "get",
      queryType: "getAllRequest",
    }
    
    return this.http.get<any>(this.awsURL, { params: params });
  }

  updateChapterDate(subject:string,standard:string,chapterNo:string,startDate:string): Observable<any>{
    let params = {
      type: "post",
      queryType: "updateChapterDate"
    }
    const body = {
      subject:subject,
      standard:standard,
      chapterNo:chapterNo,
      startDate:startDate,
    }
    
    return this.http.post<any>(this.awsURL,JSON.stringify(body), { params: params });
  }

  updateChapterStatus(row:any): Observable<any>{
    let params = {
      type: "post",
      queryType: "updateChapterStatus"
    }
    const body = {
      subject:row.subject,
      standard:row.standard,
      chapterNo:row.chapterNo
    }
    
    return this.http.post<any>(this.awsURL,JSON.stringify(body), { params: params });
  }

  updateUserStatus(row:any): Observable<any>{
    let params = {
      type: "post",
      queryType: "updateUserStatus"
    }
    const body = {
      userID:row.userID,
      timeStamp:row.timeStamp,
    }
    
    return this.http.post<any>(this.awsURL,JSON.stringify(body), { params: params });
  }
}


