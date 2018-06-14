import { Component } from '@angular/core';
import { NavController, LoadingController, Events, ToastController,Platform } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Validators, FormBuilder } from '@angular/forms';
import { Network } from '@ionic-native/network';
import { authService } from '../../services/authService';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  users
  

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private network: Network,
    private authservice: authService, public loadingCtrl: LoadingController,
    public events: Events, private toastCtrl: ToastController, private sqlite: SQLite,public platform: Platform) {
    this.users = this.formBuilder.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required],
    });
  }

  doLogin() {
    console.log(this.users.value.userName)
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.authservice.getAccessToken(this.users.value.userName, this.users.value.passWord)
      .subscribe(accesToken => {
        console.log(accesToken)
        if (accesToken) {
          window.localStorage.setItem('accesToken', JSON.stringify(accesToken))

          this.authservice.getUserDetails(this.users.value.userName)
            .subscribe(userDetails => {
              console.log(JSON.stringify(userDetails))
              if (userDetails.Role == null) {
                //Invalid username/password
                let toast = this.toastCtrl.create({
                  message: 'Invalid username/password',
                  duration: 5000,
                  cssClass:'toast-center',
                  position: 'top'
                });
                toast.present();

                this.users.reset();

              } else {
                if (userDetails.Role.RoleID == 3 || userDetails.Role.RoleID == 4) {
                  console.log('paraseed inspector')
                  window.localStorage.setItem('Role', JSON.stringify(userDetails.Role.RoleID))
                  window.localStorage.setItem('UserID', JSON.stringify(userDetails.UserID))
                  window.localStorage.setItem('user', JSON.stringify(userDetails));
                  window.localStorage.setItem('username', JSON.stringify(userDetails.UserName));
                  //publish an event
                  this.events.publish('user:login', userDetails);

                  //save call to store data in sql storage
                  if (this.platform.is('cordova')) {
                    this.saveDateToSqlStorage(userDetails)
                  }
                  this.navCtrl.setRoot(HomePage, {
                    Role: userDetails.Role.RoleID
                  });
                } else {
                  //Invalid username/password
                  let toast = this.toastCtrl.create({
                    message: 'You have no access to login, please contact your management',
                    duration: 5000,
                    position: 'top',
                    cssClass:'toast-center'
                  });
                  toast.present();
                  this.users.reset();
                }
              }
              loading.dismiss();

            })
        } else {
          loading.dismiss();

          let toast = this.toastCtrl.create({
            message: 'Invalid username/password',
            duration: 4000,
            position: 'top',
            cssClass:'toast-center'
          });
          toast.present();

          this.users.reset();
        }
      }, error => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Connect to Network and login again',
          duration: 5000,
          position: 'top',
          cssClass: 'toast-warning'
        });
        toast.present();

        console.log(error)
      })



  }


  ionViewDidEnter() {
    console.log('ionViewDidEnter')
    this.network.onConnect().subscribe(data => {
      // alert('onConnect' + JSON.stringify(data))
      // alert(this.network.type)
      //publish an event if network is disconnected
      this.events.publish('isNetworkAvailable', true);
      let toast = this.toastCtrl.create({
        message: 'Connected',
        position: 'top',
        cssClass: 'toast-success',
        duration: 5000
      });
      toast.present();
    }, error => console.error(error));


    this.network.onDisconnect().subscribe(data => {
      // alert('onDisconnect' + JSON.stringify(data))
      // alert(this.network.type)
      //publish an event if network is disconnected
      this.events.publish('isNetworkAvailable', false);

      let toast = this.toastCtrl.create({
        message: 'No Internet Connection',
        position: 'top',
        cssClass: 'toast-danger',
        duration: 5000
      });
      toast.present();

    }, error => console.error(error));
  }


  createTable() {
   // alert('create Table')

    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('CREATE TABLE IF NOT EXISTS usertable(rowid INTEGER PRIMARY KEY, UserID INT,DeviceToken TEXT, UserName TEXT, FirstName TEXT,LastName TEXT,RoleID INT,RoleName TEXT,Email TEXT, MobileNumber INT,State TEXT,Country TEXT,PostalCode TEXT,Region TEXT,District TEXT,EPA TEXT,Section TEXT)', {})
        .then(res => 
          console.log('s 1 ' + JSON.stringify(res)
        ))
        .catch(e =>  console.log('e 1' + e));
    })

  }


  saveDateToSqlStorage(userDetails) {
    console.log('save Date To SqlStorage')
    var deviceToken = JSON.parse(window.localStorage.getItem('deviceToken'));
    console.log('device Token'+ deviceToken)

    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('INSERT INTO usertable VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
       [userDetails.UserID, 
        deviceToken,
        userDetails.UserName,
        userDetails.FirstName,
        userDetails.LastName,
        userDetails.Role.RoleID,
        userDetails.Role.Name,
        userDetails.Email,
        userDetails.MobileNumber,
        userDetails.Address.State.StateName,
        userDetails.Address.Country.CountryName,
        userDetails.Address.PostalCode,
        userDetails.Address.Region.RegionName,
        userDetails.Address.District.DistrictName,
        userDetails.Address.EPA.EPAName,
        userDetails.Address.Section.SectionName,
      ]).then(res => {
        console.log('sucess' + JSON.stringify(res))
         // this.getDateSqlStorage();
        })
        .catch(e => {
          console.log('eeeeer1' + e)
        });
    }).catch(e => {
      console.log('eeeeer2' + e);
    });
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad')
  //   if (this.platform.is('cordova')) {
  //     this.createTable();
  //   }
  // }
  
  ionViewWillEnter() {
    console.log('ionViewWillEnter')
    if (this.platform.is('cordova')) {
      this.createTable();
    }
  }

}
