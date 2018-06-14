import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { ObservationsPage } from '../../pages/observations/observations'
import { AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';

@Component({
  selector: 'page-grower-details',
  templateUrl: 'grower-details.html',
})
export class GrowerDetailsPage {
  grower
  title
  role
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private view: ViewController,
    private callNumber: CallNumber,
    public alertCtrl: AlertController,
    private camera: Camera,
    private photoLibrary: PhotoLibrary) {

  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad GrowerDetailsPage');
    this.grower = this.navParams.get('grower');
    console.log(this.grower)
    this.role = JSON.parse(window.localStorage.getItem('Role'))
    if (this.role == 4) {
      this.title = "Crop Details"
    }
    if (this.role == 3) {
      this.title = "Grower Details"
    }
  }

  closeModal() {
    this.view.dismiss()
  }

  inspectNow(crop, classOfSeed, Variety, regId) {
    console.log(regId)
    console.log(Variety)
    this.navCtrl.push(ObservationsPage, {
      growerCrop: crop,
      classOfSeed: classOfSeed,
      variety: Variety,
      regId: regId
    })
  }

  call(number) {
    this.callNumber.callNumber(number, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }


  imgaeUrl
  imagesArr = []

  OnTakePicture() {
    
    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(imageData => {
        //const currentName = imageData.replace(/^.*[\\\/]/, labelId + '_');
        var url = imageData;
        var album = 'seedCertification';

        this.photoLibrary.saveImage(url, album)
          .then(Item => {
            alert(Item)
            // this.navCtrl.push(CameraPage, {
            //   url: url
            // })
          })
          .catch(err => {
            alert(err)
          })
      })
      .catch(err => {
        alert(err)
      })
  }



}
