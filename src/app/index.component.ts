import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { START_TIME, END_TIME } from './config';

@Component({
  selector: 'angstrom-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  UNITS: string[] = ["days", "hours", "minutes", "seconds"];
  DURATIONS: number[] = [100, 24, 60, 60];
  time: number[] = [0, 0, 0, 0];

  constructor(private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle("ångstromCTF");

    if (Date.now() > START_TIME) var secs = Math.floor((END_TIME - Date.now()) / 1000);
    else var secs = Math.floor((START_TIME - Date.now()) / 1000);

    for (var i = 3; i >= 0; i--) {
        this.time[i] = secs % this.DURATIONS[i];
        secs = Math.floor(secs / this.DURATIONS[i]);
    }

    var canvas: any = document.getElementById("clock");
    var ctx = canvas.getContext("2d");
    console.log(canvas);

    window.setInterval(() => {

      for (var i = 3; i >= 0; i--) {
        this.time[i] -= 1;

        if (this.time[i] < 0) this.time[i] = this.DURATIONS[i] - 1;
        else break;
      }

      console.log("update!");
      canvas.width = window.innerWidth / 1.5;
      canvas.height = canvas.width / 4;
      ctx.strokeStyle = "#ffca00";
      ctx.lineWidth = canvas.height / 30;

      for (var i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(canvas.width * (2*i+1)/8, canvas.height/2, canvas.height/2.75, -Math.PI*.5,Math.PI*2*this.time[i]/this.DURATIONS[i]-Math.PI*.5);
        ctx.stroke();
      }
    }, 1000);
  }
}

//
//     updateTime() : void {
//       var canvas = document.getElementById("clock");
//       var ctx = canvas.getContext("2d");
//       canvas.width = window.innerWidth / 1.5;
//       canvas.height = canvas.width / 4;
//
// // var times = new Array(4);
// // var l = 1;
// // for (i = 3; i >= 0; i--) {
// //   times[i] = Math.floor(seconds/l)%dividers[i];
// //   l *= dividers[i];
// // }
// // ctx.lineWidth = canvas.height/20;
// // ctx.strokeStyle = "#AE73AE";//colour of the wheels
// // for (i = 0; i < 4; i++) {//circles
// //   ctx.beginPath();
// //   ctx.arc(canvas.width * (2*i+1)/8, canvas.height/2, canvas.height/2.75, -Math.PI*.5,Math.PI*2*times[i]/dividers[i]-Math.PI*.5);
// //   ctx.stroke();
// // }
// // ctx.textAlign = "center";
// // ctx.textBaseline = "bottom";
// // ctx.font = Math.floor(canvas.height/10).toString() + "pt Lato";//font
// // for (i = 0; i < 4; i++) {
// //   ctx.fillText(times[i], canvas.width * (2*i+1)/8, canvas.height/2);
// // }
// // ctx.textBaseline = "top";
// // ctx.font = Math.floor(canvas.height/15).toString() + "pt Lato";
// // for (i = 0; i < 4; i++) {
// //   var unit = units[i];
// //   if (times[i] != 1) unit += "S";//plural units
// //   ctx.fillText(unit, canvas.width * (2*i+1)/8, canvas.height/2);
// // }
// // var head = document.getElementById("time");
// // if (cur_time < START) {
// //   head.innerHTML = "Competition has not yet started! Time until start:";
// // } else if (cur_time < END) {
// //   head.innerHTML = "Competition has begun! Time remaining:";
// // } else {
// //   head.innerHTML = "Competition is over!";
// // }
// // }
// // var canvas = document.getElementById("clock");
// // canvas.width = window.innerWidth / 1.5;
// // canvas.height = canvas.width / 4;
// // }
