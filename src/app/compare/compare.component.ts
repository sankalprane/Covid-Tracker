import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Helper } from '../helper';
import { CovidService } from '../services/covid.service';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  FirstCountryData: any = {};
  SecondCountryData: any = {};
  allCountries = Helper.countries;
  period = Helper.period;
  queryForm: FormGroup
  dataLoaded = false;


  constructor(
    private _covidService: CovidService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {

    this.queryForm = this._fb.group({
      country1: [null, Validators.required],
      country2: [null, Validators.required],
      period: [null],
      searchTerm1: [''],
      searchTerm2: [''],
    })

  }

  filterCountries(term: string, classname: string, parentname: string) {
    var filter, a, i;
    filter = term.toUpperCase();
    let div = document.getElementsByClassName(parentname)[0];
    a = div.getElementsByClassName(classname);
    for (i = 0; i < a.length; i++) {
      let txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      }
      else {
        a[i].style.display = "none";
      }
    }
  }

  getData() {
    // console.log(this.queryForm.value);
    this.onCreate();
  }

  onCreate() {
    let country1 = this.queryForm.get('country1').value;
    let country2 = this.queryForm.get('country2').value;
    this._covidService.getCountryData(country1).subscribe((data) => {
      console.log(data);
      if (data != undefined && data != null) {
        this.dataLoaded = true;
        this.FirstCountryData = data;
      } else {
        this.dataLoaded = false;
      }
    });
    this._covidService.getCountryData(country2).subscribe((data) => {
      console.log(data);
      if (data != undefined && data != null) {
        this.dataLoaded = true;
        this.SecondCountryData = data;
      } else {
        this.dataLoaded = false;
      }
      this.getGraph();
    });
  }

  getGraph() {
    var myChart = new Chart('comparebarchart', {
      type: 'bar',
      data: {
        labels: ['Cases', 'Critical', 'Deaths', 'Recovered'],
        datasets: [
          {
            label: this.FirstCountryData.country,
            barPercentage: 1,
            barThickness: 50,
            maxBarThickness: 50,
            data: [
              this.FirstCountryData.todayCases,
              this.FirstCountryData.critical,
              this.FirstCountryData.todayDeaths,
              this.FirstCountryData.todayRecovered,
            ],
            backgroundColor: 'blue',
          },
          {
            label: this.SecondCountryData.country,
            barPercentage: 1,
            barThickness: 50,
            maxBarThickness: 50,
            data: [
              this.SecondCountryData.todayCases,
              this.SecondCountryData.critical,
              this.SecondCountryData.todayDeaths,
              this.SecondCountryData.todayRecovered,
            ],
            backgroundColor: 'red',
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
