import { CovidService } from './../services/covid.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  allData;
  dataLoaded = false

  constructor(
    private _covidService: CovidService
  ) { }

  ngOnInit(): void {
    this.getLatestData();
  }


  getLatestData(){
    this._covidService.getAllData()
    .subscribe(data=>{
      this.allData = data;
      this.dataLoaded = true
    })
  }

}
