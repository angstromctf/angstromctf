import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { START_TIME, END_TIME } from './config';

@Component({
  selector: 'angstrom-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, AfterViewInit {
  UNITS: string[] = ["DAY", "HOUR", "MINUTE", "SECOND"];
  DURATIONS: number[] = [100, 24, 60, 60];

  constructor(private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle("ångstromCTF");
  }

  ngAfterViewInit() : void {
    var canvas: any = document.getElementById("clock");
    var ctx: any = canvas.getContext("2d");

    canvas.width = document.getElementById("clock-wrapper").clientWidth;

    window.onload = () => {
      this.repaint(canvas, ctx);
      window.setInterval(() => this.repaint(canvas, ctx), 1000);
    };

    window.onresize = () => {
      canvas.width = document.getElementById("clock-wrapper").clientWidth;
      this.repaint(canvas, ctx);
    };
  }

  repaint(canvas: any, ctx: any) : void {
    var time: number[] = [0, 0, 0, 0];

    if (Date.now() > START_TIME) var secs = Math.floor((END_TIME - Date.now()) / 1000);
    else var secs = Math.floor((START_TIME - Date.now()) / 1000);

    for (var i = 3; i >= 0; i--) {
      time[i] = secs % this.DURATIONS[i];
      secs = Math.floor(secs / this.DURATIONS[i]);
    }

    canvas.height = canvas.width / 4;
    ctx.strokeStyle = "#ffca00";
    ctx.lineWidth = canvas.height / 30;

    for (var i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.arc(canvas.width * (2 * i + 1) / 8, canvas.height / 2, canvas.height / 2.75, -Math.PI / 2, Math.PI * 2 * time[i] / this.DURATIONS[i] - Math.PI / 2);
      ctx.stroke();
    }

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = Math.floor(canvas.height / 5).toString() + "pt Orbitron";
    for (var i = 0; i < 4; i++) {
      ctx.fillText(time[i], canvas.width * (2 * i + 1) / 8, canvas.height / 2);
    }

    ctx.textBaseline = "top";
    ctx.font = Math.floor(canvas.height / 20).toString() + "pt Orbitron";
    for (var i = 0; i < 4; i++) {
      var unit = this.UNITS[i];
      if (time[i] != 1) unit += "S";
      ctx.fillText(unit, canvas.width * (2 * i + 1)/8, canvas.height / 2 + canvas.height / 10);
    }
  }
}
