import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';
import { AuthService } from 'src/app/auth/auth.service';
import { DashboardInfo } from 'src/app/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private Jarwis: AuthService,
    private messageService: MessageService,


  ) { }
  data: any;
  dashInfo = new DashboardInfo();
  chartOptions: any;

  subscription: Subscription;

  config: AppConfig;
  basicData: any;

  multiAxisData: any;

  multiAxisOptions: any;

  lineStylesData: any;

  basicOptions: any;
  ngOnInit(): void {
    this.data = {
      labels: ['User','Job','Vehicle'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#42A5F5",
                  "#66BB6A",
                  "#FFA726"
              ],
              hoverBackgroundColor: [
                  "#64B5F6",
                  "#81C784",
                  "#FFB74D"
              ]
          }
      ]
  };

  this.basicData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#FFA726',
            tension: .4
        }
    ]
};

this.getDashboardData();

  }
  updateChartOptions() {
    this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
}

getLightTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    }
}

getDarkTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        }
    }

}

getDashboardData(){
  this.Jarwis.getDashboardData().subscribe(
    (data) => this.handleData(data, "success"),
    (error) => this.handleError(error)
  );
}
handleError(error) {
  let msg = error.error ? error.error : error.message;
  this.addMessages("error", "Error", msg);
}
handleData(data, type) {
  console.log(data);
  if(data.error){
    this.handleError(data);
  }else{
    this.dashInfo = data.data;
  }
}
addMessages(severity, summary, detail) {
  this.messageService.clear();
  this.messageService.add({
    severity: severity,
    summary: summary,
    detail: detail,
    sticky: true,
  });
  setTimeout(() => {
    this.messageService.clear();
  }, 3000);
}

}
