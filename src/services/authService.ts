import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class authService {
  public APIHOST = 'http://ssuservices.stage.aheadrace.com:8085/api/';
  //public APIHOST = 'http://ssuservices.aheadrace.com:8083/api/';

  constructor(private _http: Http) {

  }

  getAccessToken(userName, pwd) {
    console.log(userName)
    console.log(pwd)
    //let header = new Headers({ "Accept": "application/json" });
    return this._http.get(this.APIHOST +`login/getservicetoken?username=${userName}&password=${pwd}`)
      .map(res => res.json())
  }

  getUserDetails(userName) {
    let token = JSON.parse(window.localStorage.getItem('accesToken'));
    console.log(userName)
    console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token })

    return this._http.get(this.APIHOST +'User/GetUserDetailsByUserName?userName=' + userName, { headers: header })
      .map(res => res.json())
  }

  //GetRegistrationsByUser
  GetRegistrationsByUser(mode, userId) {
    let token = JSON.parse(window.localStorage.getItem('accesToken'));
    console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.get(this.APIHOST +`Admin/GetRegistrationsByUser?mode=${mode}&userId=${userId}`, { headers: header })
      .map(res => res.json())
  }


  //SaveInspectorObservation
  SaveInspectorObservation(obv) {
    let body = obv;
    let token = JSON.parse(window.localStorage.getItem('accesToken'));
    console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.post(this.APIHOST +'Admin/SaveInspectorObservation', body, { headers: header })
      .map(res => res.json())
  }

  //GetInspectedGrowersPerMonth
  GetInspectedGrowersPerMonth() {
    let token = JSON.parse(window.localStorage.getItem('accesToken'));

    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST +`Home/GetInspectedGrowersPerMonth?userId=3&year=2018`, { headers: header })
      .map(res => res.json())
  }

  //GetInspectorStats
  GetInspectorStats(userid, role) {
    let token = JSON.parse(window.localStorage.getItem('accesToken'));

    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST +`Home/GetInspectorStats?userId=${userid}&year=2018&role=${role}`, { headers: header })
      .map(res => res.json())
  }


  //GetAreaPerCrop
  GetAreaPerCrop(userid, role) {
    let token = JSON.parse(window.localStorage.getItem('accesToken'));

    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept": "*/*" })
    return this._http.get(this.APIHOST +`Home/GetAreaPerCrop?year=2018&userId=${userid}&role=${role}`, { headers: header })
      .map(res => res.json())
  }



}