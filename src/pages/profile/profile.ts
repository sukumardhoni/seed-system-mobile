import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { authService } from '../../services/authService';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userProfile
  localUserObj
  constructor(public navCtrl: NavController, public navParams: NavParams,private authservice: authService,
    private sqlite: SQLite) {
  }

  
  ngOnInit() {
    let username = JSON.parse(window.localStorage.getItem('username'));
    console.log(username)
   this.authservice.getUserDetails(username)
   .subscribe(res => {
     console.log(JSON.stringify(res))
     this.userProfile = res
   },error => {
     console.log(error);
    this.getDateSqlStorage()
     
   })

  }


  sqlArrTable
  getDateSqlStorage() {
    //alert('get Date SqlStorage')
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
    
      db.executeSql('SELECT * FROM usertable ORDER BY rowid DESC', {})
        .then(res => {
          //alert('success getting data from table' + JSON.stringify(res))
          this.sqlArrTable = [];
          
          for(var i=0; i<res.rows.length; i++) {
            this.sqlArrTable.push({
              rowid:res.rows.item(i).rowid,
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

         // alert('sqlArrTable' + JSON.stringify( this.sqlArrTable))

      

          this.sqlArrTable.filter(singleObj => {
           // return singleObj;
           this.localUserObj = singleObj
           // alert('filtered Obj '+ JSON.stringify(singleObj))
          })
         //alert('filtered Obj '+ JSON.stringify(this.userProfile))
        })
        //.catch(e => alert('e 2' + e));

    })
  }

}
