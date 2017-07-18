/**
 * Displayed when the site is loaded, with a countdown timer to the start/end of ångstromCTF and basic information
 * about the competition, the types of questions, etc., and a link to sign up.
 */

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { START_TIME, END_TIME } from '../config';
import { StatusService } from '../utils/status.service';

@Component({
  selector: 'angstrom-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, AfterViewInit {
  // The units of time in use by the clock and their durations
  UNITS: string[] = ["DAY", "HOUR", "MINUTE", "SECOND"];
  DURATIONS: number[] = [100, 24, 60, 60];

  constructor(private title: Title, public status: StatusService) { }

  ngOnInit(): void {
    this.title.setTitle("ångstromCTF");
  }

  /**
   * Prepare to render the clock.
   */
  ngAfterViewInit(): void {
    if (!this.status.ended) {
      let canvas: any = document.getElementById("clock");
      let ctx: any = canvas.getContext("2d");

      // Make the canvas full width
      canvas.width = document.getElementById("clock-wrapper").clientWidth;

      // Set up the clock when the window loads
      window.onload = () => this.setup(canvas, ctx);
      if (document.readyState === "complete") this.setup(canvas, ctx);

      // Resize the clock when the window is resized
      window.onresize = () => {
        canvas.width = document.getElementById("clock-wrapper").clientWidth;
        this.repaint(canvas, ctx);
      };
    }
  }

  /** Start rendering the clock. */
  setup(canvas: any, ctx: any) {
    this.repaint(canvas, ctx);
    window.setInterval(() => this.repaint(canvas, ctx), 1000);
  }

  /**
   * Redraw the countdown timer. Called every second by the timer created in setup().
   * @param canvas The HTML5 canvas to draw on.
   * @param ctx A handle to the HTML5 canvas drawing context for the canvas.
   */
  repaint(canvas: any, ctx: any): void {
    if (!this.status.ended) {
      let seconds_remaining: number;

      // Store the current time, split up by units
      let time: number[] = this.DURATIONS.slice();

      if (Date.now() > START_TIME) {
        // Before the competition, display the time until it starts
        seconds_remaining = Math.floor((END_TIME - Date.now()) / 1000);
      } else {
        // During the competition, display the time until it ends
        seconds_remaining = Math.floor((START_TIME - Date.now()) / 1000);
      }

      // Break the time down into the different units
      for (let i = time.length; i >= 0; i--) {
        time[i] = seconds_remaining % this.DURATIONS[i];
        seconds_remaining = Math.floor(seconds_remaining / this.DURATIONS[i]);
      }

      // Set the canvas aspect ratio, which also clears it
      canvas.height = canvas.width / 4;

      // Set the drawing style for the clock bars
      ctx.strokeStyle = "#ffca00";
      ctx.lineWidth = canvas.height / 30;

      // Stroke each unit of the clock
      for (let i = 0; i < time.length; i++) {
        ctx.beginPath();
        ctx.arc(canvas.width * (2 * i + 1) / (time.length * 2), canvas.height / 2, canvas.height / 2.75, -Math.PI / 2, Math.PI * 2 * time[i] / this.DURATIONS[i] - Math.PI / 2);
        ctx.stroke();
      }

      // Set the drawing style for the clock text
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Stroke the quantity of each unit of time
      ctx.font = Math.floor(canvas.height / 5).toString() + "pt Orbitron";
      for (let i = 0; i < time.length; i++) {
        ctx.fillText(time[i], canvas.width * (2 * i + 1) / (2 * time.length), canvas.height / 2);
      }

      // Stroke the name of each unit of time
      ctx.textBaseline = "top";
      ctx.font = Math.floor(canvas.height / 20).toString() + "pt Orbitron";
      for (let i = 0; i < time.length; i++) {
        let unit: string = this.UNITS[i];
        if (time[i] != 1) unit += "S";
        ctx.fillText(unit, canvas.width * (2 * i + 1) / (2 * time.length), canvas.height / 2 + canvas.height / 10);
      }
    }
  }
}
