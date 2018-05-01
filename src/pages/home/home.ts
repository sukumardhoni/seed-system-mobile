import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';

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
  FilterdStats
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: authService,
    public loadingCtrl: LoadingController,private toastCtrl: ToastController) {

  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.authService.GetInspectedGrowersPerMonth()
      .subscribe(res => {
        this.getInspStats(loading);
        var GrowersPerMonth = [];
        GrowersPerMonth[0] = ['Month', 'Inspected Count'];

        for (var i = 0; i < res.length; i++) {
          if (res[i].InspectedCount != 0) {
            GrowersPerMonth[i + 1] = [res[i].Month, res[i].InspectedCount];
            console.log(JSON.stringify(GrowersPerMonth[i]))
          }

        }

        if (GrowersPerMonth) {
          this.FilterdStats = GrowersPerMonth.filter(Boolean);
          console.log(JSON.stringify(GrowersPerMonth))
          this.PsiBarChartDataForDistrict = {
            chartType: 'ColumnChart',
            dataTable: this.FilterdStats,
            options: { 'title': 'Inspected Growers Per Month - 2018' },
          };
        }
        //loading.dismiss();
       
      }, error => {
        
        let toast = this.toastCtrl.create({
          message: 'there is an error while fetching items, please try later',
          duration: 3000,
          position: 'top'
        });
        
        toast.present();
        //loading.dismiss();

        this.dismissLoader(loading)
      })


    

  }

  dismissLoader(loading){
    console.log('loading')
    loading.dismiss();
  }

getInspStats(loading){

  this.authService.GetInspectorStats()
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
    //loading.dismiss();
    this.dismissLoader(loading)
  }, error => {
   
    let toast = this.toastCtrl.create({
      message: 'there is an error while fetching items, please try later',
      duration: 3000,
      position: 'top'
    });
    
    toast.present();
     //loading.dismiss();
     this.dismissLoader(loading)
  })
}
  
}
