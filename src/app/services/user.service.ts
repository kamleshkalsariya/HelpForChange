import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private awsURL = "https://esermi0hd0.execute-api.ap-south-1.amazonaws.com/default/Education";

  getUserRequest(userID:any): Observable<any> {
    let params = {
      type: "get",
      queryType: "getUserRequest",
      userID:userID
    }

    return this.http.get<any>(this.awsURL, { params: params });
  }

  getUser(userID:any):Observable<any> {
    let params = {
      type:"get",
      queryType:"getUser",
      userID:userID
    }
    return this.http.get<any>(this.awsURL, { params: params });
  }

  updateUser(userID:string,fname:string,email:string,mobileNo:string,occupation:string,files: File[]): Observable<any>{
    let params = {
      type: "post",
      queryType: "updateUser",
    }
    let body = null;
    if (files == undefined || files == null || files.length == 0) {
      body = {
        userID:userID,
        fname:fname,
        email:email,
        mobileNo:mobileNo,
        occupation:occupation
      }
    }else{
      let file = files[0];
      let extension = file.type.split("/");
      let type = extension[extension.length - 1];
      let imgURL = `https://hfc-web.s3.ap-south-1.amazonaws.com/user/${userID}.${type}`;
      body = {
        userID:userID,
        fname:fname,
        email:email,
        mobileNo:mobileNo,
        occupation:occupation,
        imgURL:imgURL
      }
    }
    return this.http.post<any>(this.awsURL, JSON.stringify(body), { params: params });
  }

  addDoctorProfile(userID:string,fname:string,mobileNo:string,degree:string,fos:string,address:string,service:string,files: File[]): Observable<any>{
    let params = {
      type: "post",
      queryType: "addDoctor",
    }
    let body = null;
    if (files == undefined || files == null || files.length == 0) {
      body = {
        userID:userID,
        fname:fname,
        mobileNo:mobileNo,
        degree:degree,
        fos:fos,
        address:address,
        service:service
      }
    }else{
      let file = files[0];
      let extension = file.type.split("/");
      let type = extension[extension.length - 1];
      let imgURL = `https://hfc-web.s3.ap-south-1.amazonaws.com/dr/${userID}.${type}`;
      body = {
        userID:userID,
        fname:fname,
        mobileNo:mobileNo,
        degree:degree,
        fos:fos,
        address:address,
        service:service,
        imgURL:imgURL
      }
    }
    return this.http.post<any>(this.awsURL, JSON.stringify(body), { params: params });
  }

  getDoctorList():Observable<any> {
    let params = {
      type:"get",
      queryType:"getDoctorList"
    }
    return this.http.get<any>(this.awsURL, { params: params });
  }
}
