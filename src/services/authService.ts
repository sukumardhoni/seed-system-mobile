import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class authService {
    expenses: any = [];
    totalIncome = 0;
    totalExpense = 0;
    balance = 0;
    constructor(private _http: Http) {

    }

    getAccessToken(userName, pwd) {
        console.log(userName)
        console.log(pwd)
        //let header = new Headers({ "Accept": "application/json" });
        return this._http.get(`http://ssuservices.aheadrace.com:8083/api/login/getservicetoken?username=${userName}&password=${pwd}`)
          .map(res => res.json())
      }

      getUserDetails(userName) {
        let token = JSON.parse(window.localStorage.getItem('accesToken'));
        console.log(userName)
        console.log(token)
        let header = new Headers({ 'ServiceAccessToken': token })
    
        return this._http.get('http://ssuservices.aheadrace.com:8083/api/User/GetUserDetailsByUserName?userName=' + userName, { headers: header })
          .map(res => res.json())
      }

      //GetRegistrationsByUser
  GetRegistrationsByUser(mode,userId){
    let token = JSON.parse(window.localStorage.getItem('accesToken'));
    console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.get(`http://ssuservices.aheadrace.com:8083/api/Admin/GetRegistrationsByUser?mode=${mode}&userId=${userId}`, { headers: header })
      .map(res => res.json())
  }


  //SaveInspectorObservation
  SaveInspectorObservation(obv){
    let body = obv;
    let token = JSON.parse(window.localStorage.getItem('accesToken'));
    console.log(token)
    let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json" })
    return this._http.post('http://ssuservices.aheadrace.com:8083/api/Admin/SaveInspectorObservation', body, { headers: header })
      .map(res => res.json())
  }

    //GetInspectedGrowersPerMonth
    GetInspectedGrowersPerMonth(){
      let token = JSON.parse(window.localStorage.getItem('accesToken'));
     
      let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept":"*/*" })
      return this._http.get(`http://ssuservices.aheadrace.com:8083/api/Home/GetInspectedGrowersPerMonth?userId=3&year=2018`, { headers: header })
        .map(res => res.json())
    }
    
  
    //GetInspectorStats
    GetInspectorStats(){
      let token = JSON.parse(window.localStorage.getItem('accesToken'));
     
      let header = new Headers({ 'ServiceAccessToken': token, "Content-Type": "application/json", "Accept":"*/*" })
      return this._http.get(`http://ssuservices.aheadrace.com:8083/api/Home/GetInspectorStats?userId=3&year=2018`, { headers: header })
        .map(res => res.json())
    }

  
    

}