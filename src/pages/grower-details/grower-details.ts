import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { ObservationsPage } from '../../pages/observations/observations'
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-grower-details',
  templateUrl: 'grower-details.html',
})
export class GrowerDetailsPage {
  grower
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private view:ViewController,
    private callNumber: CallNumber,
    public alertCtrl: AlertController) {
 
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad GrowerDetailsPage');
    this.grower = this.navParams.get('grower');
    console.log(this.grower)
  }

  closeModal(){
    this.view.dismiss()
  }

  inspectNow(crop,classOfSeed,Variety,regId) {
    console.log(regId)
    console.log(Variety)
    this.navCtrl.push(ObservationsPage,{
      growerCrop:crop,
      classOfSeed:classOfSeed,
      variety:Variety,
      regId:regId 
    })
  }

   call(number) {
    this.callNumber.callNumber(number, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
      
  }



  

}
