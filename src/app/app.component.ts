/**
 * "Master template" for all the pages on the site.
 */

import { Component, HostListener, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StatusService } from './utils/status.service';
import { ModalService } from './utils/modal.service';
import { AlertService } from './utils/alert.service';
import { LoginComponent } from './users/login.component';

const STARS = 100;
const BASE_SPEED = 0.0002;

function gaussian(): number {
  let sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += Math.random();
  }

  return (sum - 5) / 5;
}

@Component({
    selector: 'angstrom-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(public status: StatusService, private modalService: ModalService, private alert: AlertService, private router: Router) {

  }

  /**
   * Log out the user.
   */
  logout(): void {
    this.status.logout().then(() => {
      // Notify the user and navigate back to the index
      this.alert.open("success", "You've been logged out.");
      this.router.navigateByUrl('/');
    });
  }


  stars: any[] = [];
  ngOnInit(): void {
    this.genStars(document.body.clientHeight/1000);
  }

  tick(canvas): void {

    var yCons = 1375/canvas.height;
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].x += this.stars[i].vx + gaussian() * BASE_SPEED * 2;
      this.stars[i].y += (this.stars[i].vy + gaussian() * BASE_SPEED * 2) * yCons;

      if (this.stars[i].x < 0) this.stars[i].x += 1;
      if (this.stars[i].x > 1) this.stars[i].x -= 1;
      if (this.stars[i].y < 0) this.stars[i].y += 1;
      if (this.stars[i].y > 1) this.stars[i].y -= 1;
    }
  }

  /**
   * Close the modal when the escape key is pressed.
   */
  @HostListener('document:keydown.escape')
  escape(): void {
    this.modalService.close();
  }

  /**
   * Prepare to render the background.
   */
  ngAfterViewInit(): void {
    let canvas: any = document.getElementById("background");
    let ctx: any = canvas.getContext("2d");

    // Set up the clock when the window loads
    window.onload = () => this.setup(canvas, ctx);
    if (document.readyState === "complete") this.setup(canvas, ctx);
  }

  resize(canvas: any): void {
    // Make the canvas full size
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

  }

  /** Start rendering the background. */
  setup(canvas: any, ctx: any) {
    this.resize(canvas);
    this.repaint(canvas, ctx);
    window.setInterval(() => { this.tick(canvas); this.resize(canvas); this.repaint(canvas, ctx); this.genStars(document.body.clientHeight/1000);}, 50);
  }

  repaint(canvas: any, ctx: any): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < this.stars.length; i++) {
      ctx.fillStyle = 'hsl(' + this.stars[i].h + ',100%,60%)';
      ctx.beginPath();
      ctx.arc(this.stars[i].x * canvas.width, this.stars[i].y * canvas.height, this.stars[i].r, 0, 2*Math.PI, false);
      ctx.fill();
    }
  }

  //Generate the stars/orbs that float on the site
  genStars(numStars: any) : void {
    var currStarCount = this.stars.length;
    var newStarCount = Math.floor(STARS*numStars);
    if (newStarCount == currStarCount)
      return;
    else if (newStarCount > this.stars.length) {
      console.log("new set");
      //this.stars = [];
      for (let i = currStarCount; i < newStarCount; i++) {
        let sf = Math.abs(gaussian());
        this.stars[i] = {
          x: Math.random(),
          y: Math.random(),
          r: 4 / Math.pow(sf + 1, 10),
          vx: BASE_SPEED * gaussian(),
          vy: -BASE_SPEED * (20 * sf + 4),
          h: 300 + gaussian() * 200
        };
      }
    } else {
        this.stars = this.stars.slice(0,newStarCount);
    }
  }

}
