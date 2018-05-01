import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class dbService {
    constructor(private _http: Http,private sqlite: SQLite) {

    }

    sqlArrTable
  getDateSqlStorage() {
    alert('get Date SqlStorage')
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
    
      db.executeSql('SELECT * FROM usertable ORDER BY rowid DESC', {})
        .then(res => {
          alert('success getting data from table' + JSON.stringify(res))
          this.sqlArrTable = [];
          
          for(var i=0; i<res.rows.length; i++) {
            this.sqlArrTable.push({
              rowid:res.item(i).rowid,
              UserID:res.rows.item(i).UserID,
              DeviceToken:res.rows.item(i).DeviceToken,
              UserName:res.rows.item(i).UserName,
              FirstName:res.rows.item(i).FirstName,
              LastName:res.rows.item(i).LastName,
              RoleID:res.rows.item(i).RoleID,
              RoleName:res.rows.item(i).RoleName,
              Email:res.rows.item(i).Email,
              MobileNumber:res.rows.item(i).MobileNumber,
              State:res.rows.item(i).State,
              Country:res.rows.item(i).Country,
              PostalCode:res.rows.item(i).PostalCode,
              Region:res.rows.item(i).Region,
              District:res.rows.item(i).District,
              EPA:res.rows.item(i).EPA,
              Section:res.rows.item(i).Section,
            })
          }

          alert('sqlArrTable' + JSON.stringify( this.sqlArrTable))
        })
        .catch(e => alert('e 2' + e));

    })
  }
}