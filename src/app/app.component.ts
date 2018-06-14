import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { inspectionsPage } from '../pages/inspections/inspections'
import { ProfilePage } from '../pages/profile/profile'
import { HomePage } from '../pages/home/home'

//import { FCM } from '@ionic-native/fcm';
import { Firebase } from '@ionic-native/firebase';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  user
  title
  role
  isNetworkAvailable
  //rootPage: any = CameraPage;
  pages: Array<{ title: string, component: any, icon: any }>;



  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public events: Events, private firebase: Firebase, private sqlite: SQLite) {
    this.initializeApp();

    // if (this.platform.is('cordova')) {
    //   this.fcm.getToken().then(token => {
    //     //backend.registerToken(token);
    //     alert(token)
    //   });
    // }
    if (this.platform.is('cordova')) {
      this.firebase.getToken()
        .then(token => {
          // save the token server-side and use it to push notifications to this device
          window.localStorage.setItem('deviceToken', JSON.stringify(token));
          // alert(`The token is ${token}`)
        })
      //.catch(error => alert('Error getting token'+ error));
    }


    //subscribe an event if network is lost
    events.subscribe('isNetworkAvailable', (network) => {
      //alert('in the app component'+ network)
      this.isNetworkAvailable = network
    })


    //subscribe an event when user logged in
    events.subscribe('user:login', (user) => {
      if (user) {
        this.user = user;
        this.isNetworkAvailable = true;
        console.log('in the app component', this.user)
        this.role = JSON.parse(window.localStorage.getItem('Role'))
        console.log(this.role)
        this.initializePages();

        // if (this.role == 4) {
        //   this.title = "Registrations" //for grower
        //   console.log(this.title)
        // }

        // if (this.role == 3) {
        //   this.title = "Inspect" //for Psi
        //   console.log(this.title)
        // }
      }
    });

    this.user = JSON.parse(window.localStorage.getItem('user'));
    //console.log('in the app component', this.user)

    if (this.user) {
      this.rootPage = HomePage
    } else {
      this.rootPage = LoginPage
    }
    this.role = JSON.parse(window.localStorage.getItem('Role'))

    console.log(this.role)
    if (this.role == 4) {
      this.initializePages() //for grower
    }

    if (this.role == 3) {
      this.initializePages() //for Psi
    }



  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signOut() {
    localStorage.clear();
    this.events.publish('user:login', null);
    this.nav.setRoot(LoginPage);

    if (this.platform.is('cordova')) {
      this.removeUserTable();
    }
  }

  removeUserTable() {
    let rowid = 1
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM usertable WHERE rowid=?', [rowid])
        .then(res => {
          console.log(res);
        })
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  goToPrgofile() {
    console.log('goToPrgofile')

    this.nav.push(ProfilePage)
  }

  initializePages() {
    if (this.role == 3) {
      // used for an example of ngFor and navigation
      this.pages = [
        { title: 'Home', component: HomePage, icon: 'md-pie' },
        { title: 'Inspect', component: inspectionsPage, icon: 'md-clipboard' }
      ];
    }
    if(this.role == 4){
      this.pages = [
        { title: 'Home', component: HomePage, icon: 'md-pie' },
        { title: 'Registrations', component: inspectionsPage, icon: 'md-clipboard' }
      ];
    }
  }
}
