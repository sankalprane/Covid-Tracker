import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(
    private datePipe: DatePipe
  ) {

    // setInterval(() =>{
    //   let today:any = new Date();
    //   let color = "#"+this.datePipe.transform(today,'HHmmss');
    //   let time = this.datePipe.transform(today,'HH:mm:ss');
    //   document.querySelector('#time').innerHTML = time;
    //   document.body.style.backgroundColor = color;
    // },1)
   }

  ngOnInit() {
  }
}
