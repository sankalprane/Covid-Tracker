import { Component, OnInit } from '@angular/core';
import { CovidService } from '../services/covid.service';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-overall',
  templateUrl: './overall.component.html',
  // styleUrls: ['./overall.component.css'],
})
export class OverallComponent implements OnInit {
  dataLoaded = false;
  allData: any = {};
  dates = [];
  cases = [];
  recovered = [];
  deaths = [];

  constructor(private overallapi: CovidService) { }

  ngOnInit() {
    this.onCreate();
  }

  onCreate() {
    this.overallapi.getHistData().subscribe((data) => {
      // console.log(data);
      if (data != undefined && data != null) {
        this.dataLoaded = true;
        this.allData = data;
        this.dates = Object.keys(this.allData.cases);
        for (let i = 0; i < this.dates.length; i++) {
          this.cases.push(this.allData.cases[this.dates[i]]);
          this.recovered.push(this.allData.recovered[this.dates[i]]);
          this.deaths.push(this.allData.deaths[this.dates[i]]);
        }
        this.getGraph();
      } else {
        this.dataLoaded = false;
      }
    });
  }

  getGraph() {
    var myChart = new Chart('overallchart', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'Cases',
            data: this.cases,
            fill: false,
            borderColor: 'blue',
            lineTension: 0,
            borderWidth: 5,
            pointRadius: 0,
          },
          {
            label: 'Deaths',
            data: this.deaths,
            fill: false,
            borderColor: 'red',
            lineTension: 0,
            borderWidth: 5,
            pointRadius: 0,
          },
          {
            label: 'Recovered',
            data: this.recovered,
            fill: false,
            borderColor: 'green',
            lineTension: 0,
            borderWidth: 5,
            pointRadius: 0,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              stacked: false,
            },
          ],
        },
      },
    });
  }
}
