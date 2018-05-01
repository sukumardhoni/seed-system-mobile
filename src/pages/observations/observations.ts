import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';

import { inspectionsPage } from '../inspections/inspections'

import { authService } from '../../services/authService';

import { DatePicker } from '@ionic-native/date-picker';
import { Geolocation } from '@ionic-native/geolocation';
import { Validators, FormBuilder } from '@angular/forms';

import { CameraPage } from '../camera/camera'

@Component({
  selector: 'page-grower',
  templateUrl: 'observations.html',
})
export class ObservationsPage {

  user
  confirm
  dateOfSowing
  form
  regId
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private camera: Camera, private photoLibrary: PhotoLibrary, private authservice: authService,
    private datePicker: DatePicker, private formBuilder: FormBuilder, public toastCtrl: ToastController) {



    this.growerCrop = this.navParams.get('growerCrop');
    this.classOfSeed = this.navParams.get('classOfSeed');
    this.variety = this.navParams.get('variety');

    console.log(this.classOfSeed)
    console.log(this.variety)

    if (this.growerCrop == 'Groundnut') {
      this.form = this.formBuilder.group({
        dateOfSowing: ['', Validators.required],
        cropStage: ['', Validators.required],
        isolation: ['', Validators.required],
        OffTypePlants: ['', Validators.required],
        DefectiveCobs: ['', Validators.required],
        growthCondition: ['', Validators.required],
        RemarksByInspector: ['', Validators.required],
        RecommendationForGrower: ['', Validators.required],
        certRecommendation: ['', Validators.required],
      })
    }

    if (this.growerCrop != 'Groundnut') {
      if (((this.classOfSeed == 'Certified') && (this.variety == 'Hybrid Maize'))) {
        console.log('if')
        this.form = this.formBuilder.group({
          dateOfSowing: ['', Validators.required],
          cropStage: ['', Validators.required],
          isolation: ['', Validators.required],
          OffTypePlants: ['', Validators.required],
          DefectiveCobs: ['', Validators.required],
          growthCondition: ['', Validators.required],
          RemarksByInspector: ['', Validators.required],
          RecommendationForGrower: ['', Validators.required],
          certRecommendation: ['', Validators.required],
          PestDiseaseScore: ['', Validators.required],
          PlantingPattern: ['', Validators.required],
          PollinatingFemales: ['', Validators.required],
          MaleElimination: ['', Validators.required],
          OffTypeCobs: ['', Validators.required],
        })

      } else {
        console.log('else')
        if (this.variety == 'Hybrid Maize') {
          this.form = this.formBuilder.group({
            PestDiseaseScore: ['', Validators.required],
            dateOfSowing: ['', Validators.required],
            cropStage: ['', Validators.required],
            isolation: ['', Validators.required],
            OffTypePlants: ['', Validators.required],
            DefectiveCobs: ['', Validators.required],
            growthCondition: ['', Validators.required],
            RemarksByInspector: ['', Validators.required],
            RecommendationForGrower: ['', Validators.required],
            certRecommendation: ['', Validators.required],
            MaleElimination: ['', Validators.required],
          });
        } else {

          console.log('nested else')
          this.form = this.formBuilder.group({
            PestDiseaseScore: ['', Validators.required],
            dateOfSowing: ['', Validators.required],
            cropStage: ['', Validators.required],
            isolation: ['', Validators.required],
            OffTypePlants: ['', Validators.required],
            DefectiveCobs: ['', Validators.required],
            growthCondition: ['', Validators.required],
            RemarksByInspector: ['', Validators.required],
            RecommendationForGrower: ['', Validators.required],
            certRecommendation: ['', Validators.required],
          });

        }


      }
    }






  }



  ngOnInit() {
    this.growerCrop = this.navParams.get('growerCrop');
    this.classOfSeed = this.navParams.get('classOfSeed');
    this.variety = this.navParams.get('variety');

  }


  doSaveObv() {
    console.log(JSON.stringify(this.form.value))
    let regId = this.navParams.get('regId')
    console.log(regId)
    var certRecommendation, isolation;
    if (this.form.value.certRecommendation == 'Yes') {
      certRecommendation = 1
    } else if (this.form.value.certRecommendation == 'No') {
      certRecommendation = 0
    }

    if (this.form.value.isolation == 'Yes') {
      isolation = 1
    } else if (this.form.value.isolation == 'No') {
      isolation = 0
    }


    this.user = {
      RegID: regId,
      dateOfSowing: this.form.value.dateOfSowing,
      cropStage: this.form.value.cropStage,
      IsIsolationDistanceMaintained: isolation,
      OffTypePlants: this.form.value.OffTypePlants ? this.form.value.OffTypePlants : null,
      PestDiseaseScore: this.form.value.PestDiseaseScore ? this.form.value.PestDiseaseScore : null,
      PlantingPattern: this.form.value.PlantingPattern ? this.form.value.PlantingPattern : null,
      PollinatingFemales: this.form.value.PollinatingFemales ? this.form.value.PollinatingFemales : null,
      MaleElimination: this.form.value.MaleElimination ? this.form.value.MaleElimination : null,
      OffTypeCobs: this.form.value.OffTypeCobs ? this.form.value.OffTypeCobs : null,
      DefectiveCobs: this.form.value.DefectiveCobs ? this.form.value.DefectiveCobs : null,
      growthCondition: this.form.value.growthCondition,
      RemarksByInspector: this.form.value.RemarksByInspector,
      RecommendationForGrower: this.form.value.RecommendationForGrower,
      RecommendationForCertification: certRecommendation,
      FemaleReceptiveSilks: null,
      Status: "Inspected"
    }

    console.log(JSON.stringify(this.user))


    this.authservice.SaveInspectorObservation(this.user)
      .subscribe(res => {
        
        console.log(res)
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Sucessfully saved the observations!',
          buttons: [
            {
              text: 'OK',
              handler: data => {
                console.log('Saved clicked');
    
                this.navCtrl.setRoot(inspectionsPage)
              }
            }
          ]
        });
        alert.present();
      }, error => {

        let toast = this.toastCtrl.create({
          message: 'No Network available, record saved successfully. Will be synced to server upon network restore',
          position: 'top',
          cssClass: 'toast-warning'
        });
        toast.present();

      })

    
  }

  

  showDate() {
    // this.dateOfSowing = new Date()
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
    }).then(
      date => {
        // alert('Got date: ' + date)
        console.log('Got date: ', date)
        this.dateOfSowing = new Date()
      },
      err => {
        // alert('Error occurred while getting date: ' + err)
        console.log('Error occurred while getting date: ', err)
      }
    );
  }




  imgaeUrl
  OnTakePicture(labelId) {

    console.log(labelId);

    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(imageData => {
        const currentName = imageData.replace(/^.*[\\\/]/, labelId + '_');
        // const path = imageData.replace(/[^\/]*$/, '');
        // const newFileName = new Date().getUTCMilliseconds() + '.jpg';


        //let base64Image = 'data:image/jpeg;base64,' + imageData;



        var url = imageData;
        var album = 'seedCertification';

        this.photoLibrary.saveImage(url, album)
          .then(Item => {
            //alert(Item)
            this.navCtrl.push(CameraPage, {
              url: url

            })
          })
          .catch(err => {
            //alert(err)
          })


        // this.imgaeUrl = imageData;


        // this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
        //   .then(data => {
        //     this.imgaeUrl = data.nativeURL
        //     this.camera.cleanup()

        //   })
        //   .catch(err => {
        //     this.imgaeUrl = ''
        //     alert('image could not save')
        //     this.camera.cleanup()
        //   })




        // alert(this.imgaeUrl)

      })
      .catch(err => {
        // alert(err)
      })
  }

  Recommendation(ev) {

  }

  growerCrop
  classOfSeed
  variety
  // ionViewWillLoad() {
  //   console.log('ionViewDidLoad GrowerDetailsPage');
  //   this.growerCrop = this.navParams.get('growerCrop');
  //   this.classOfSeed = this.navParams.get('classOfSeed');
  //   this.variety = this.navParams.get('variety');
  //   console.log(this.classOfSeed)
  //   console.log(this.variety)
  // }

  title
  showPrompt() {

    let prompt = this.alertCtrl.create({
      title: "Boundries / Crops",
      // message: "Observation Evidence",
      inputs: [
        {
          name: 'title',
          //placeholder: 'Enter Direction Name'
        },
      ],
      buttons: [
        {

          text: 'Go',
          handler: data => {

            if (data.title) {
              console.log('Saved clicked', data.title);
              this.OnTakePicture(data.title);
            } else {
              console.log(data.title)

              let toast = this.toastCtrl.create({
                message: 'Please Enter Boundries',
                duration: 3000,
                position:'top',
                cssClass:'toast-bg'
              });
              toast.present();
              return false
            }
          }

        }
        
      ]
  });
  prompt.present();
}


}


