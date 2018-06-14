import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { authService } from '../../services/authService';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  pieChartData
  columnChartData
  PsiBarChartDataForDistrict
  PsiPieChartDataForDistrict
  growerpieChartData
  FilterdStats
  Role
  userId
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: authService,
    public loadingCtrl: LoadingController, private toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.Role = JSON.parse(window.localStorage.getItem('Role'))
    this.userId = JSON.parse(window.localStorage.getItem('UserID'))



    if (this.Role == 3) {
     
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

      this.authService.GetInspectedGrowersPerMonth()
        .subscribe(res => {
          console.log(JSON.stringify(res))
          var GrowersPerMonth = [];
          GrowersPerMonth[0] = ['Month', 'Inspected Count'];

          for (var i = 0; i < res.length; i++) {
            if (res[i].InspectedCount != 0) {
              GrowersPerMonth[i + 1] = [res[i].Month, res[i].InspectedCount];
              console.log(JSON.stringify(GrowersPerMonth[i]))
            }
          }
          console.log(GrowersPerMonth.length)
          if (GrowersPerMonth.length > 1) {
            this.FilterdStats = GrowersPerMonth.filter(Boolean);
            console.log(JSON.stringify(this.FilterdStats))
            this.PsiBarChartDataForDistrict = {
              chartType: 'ColumnChart',
              dataTable: this.FilterdStats,
              options: { 'title': 'Inspected Growers Per Month - 2018' },
            };
          }
        }, error => {
          let toast = this.toastCtrl.create({
            message: 'there is an error while fetching items, please try later',
            duration: 3000,
            position: 'top',
            cssClass:'toast-center'
          });
          toast.present();
          //loading.dismiss();
        })
        this.getCommonStats(loading)
    }

    if (this.Role == 4) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
  
      this.authService.GetAreaPerCrop(this.userId, this.Role)
        .subscribe(res => {
          var CropArea = [];
          CropArea[0] = ['CropName', 'CropArea'];
          for (var i = 0; i < res.length; i++) {
            console.log(CropArea)
            CropArea[i + 1] = [res[i].CropName, res[i].CropArea];
          }
  
          if (CropArea) {
            var filterdStats = CropArea.filter(Boolean);
            console.log(JSON.stringify(CropArea))
            this.growerpieChartData = {
              chartType: 'PieChart',
              dataTable: filterdStats,
              options: { 'title': 'Area Cultivated Per Each Crop (Hectars)' }
            };
          }
        })
        this.getCommonStats(loading)
    }
  }

  getCommonStats(loading){
    this.authService.GetInspectorStats(this.userId, this.Role)
        .subscribe(res => {
          var InspectorStats = [];
          InspectorStats[0] = ['Status', 'Count'];

          for (var i = 0; i < res.length; i++) {
            InspectorStats[i + 1] = [res[i].Status, res[i].Count];
          }

          if (InspectorStats) {
            console.log(JSON.stringify(InspectorStats))
            this.PsiPieChartDataForDistrict = {
              chartType: 'PieChart',
              dataTable: InspectorStats,
              options: { 'title': 'Assigned Vs Inspected for the year 2018' },
            };
          }
          loading.dismiss();
          // this.dismissLoader(loading)
        }, error => {

          let toast = this.toastCtrl.create({
            message: 'there is an error while fetching items, please try later',
            duration: 3000,
            position: 'top',
            cssClass:'toast-center'
          });

          toast.present();
          loading.dismiss();
          //this.dismissLoader(loading)
        })
  }
}
