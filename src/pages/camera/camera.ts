import { Component } from '@angular/core';
import {  NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Location } from '../../app/models/location'
import { Geolocation } from '@ionic-native/geolocation';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Diagnostic } from '@ionic-native/diagnostic';
//declare var cordova: any;


@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {


  location: Location = {
    lat: 17.4218880,
    lng: 78.3388580
  }
  marker: Location;
  myArray
  imgaeUrl
  constructor(private camera: Camera,
    private geolocation: Geolocation,
    private photoLibrary: PhotoLibrary,
    private openNativeSettings: OpenNativeSettings,
    public navParams: NavParams,
    private diagnostic: Diagnostic) {

    this.imgaeUrl = this.navParams.get('url')
    //alert('url'+this.imgaeUrl)
    this.LocateMe()

  }


  OnTakePicture() {

    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(imageData => {
        //const currentName = imageData.replace(/^.*[\\\/]/, '');
        //const path = imageData.replace(/[^\/]*$/, '');
        //const newFileName = new Date().getUTCMilliseconds() + '.jpg';

        var url = imageData;
        var album = 'seedCertification';

        this.photoLibrary.saveImage(url, album)
          .then(Item => {
           // alert(Item)
          })
          .catch(err => {
            //alert(err)
          })

        this.imgaeUrl = imageData;
        // alert(this.imgaeUrl)

      })
      .catch(err => {
       // alert(err)
      })
  }

  onSetMarker(event: any) {
    this.marker = new Location(event.coords.lat, event.coords.lng)
    console.log(event.coords)

  }
  setLocation
  LocateMe() {
  

    this.diagnostic.isLocationEnabled()
      .then(isAvailable => {
       // alert('sucess'+isAvailable)
        if(!isAvailable){
          this.openSettings()
        }else{
          this.getLocation()
        }
      })
      .catch(err => {
        //alert(err)
      })

  
  }

  openSettings(){
      this.openNativeSettings.open("location").then(onfullfilled => {
     // alert('sucesss settings'+onfullfilled)
        
          this.getLocation()
        
    })
    .catch(err => {
      console.log(err)
    })

  }

  getLocation(){
    this.geolocation.getCurrentPosition()
      .then(location => {

        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;

         alert('Latitude:  ' + location.coords.latitude)
         alert('Longitude:  ' + location.coords.longitude)
        this.setLocation = true;
      })
      .catch(error => {
        //alert(error)
      })
  }

}
