/**
 * Allows other Components to open modals. This is injected into all Components that need it, and gets a handle to the
 * ModalComponent created in the AppComponent.
 */

import { Injectable } from '@angular/core';
import { ChartComponent } from "./chart.component";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChartService {
  component: ChartComponent;

  setBounds(minX, maxX, minY, maxY): void {
    this.component.maxX = maxX;
    this.component.minX = minX;
    this.component.maxY = maxY;
    this.component.minY = minY;
  }

  clearLines(number=-1): void {
    if (number == -1) { number = this.component.lines.length }
    this.component.lines = this.component.lines.slice(number);
  }

  addLine(line): void {
    this.component.lines.push(line);
  }

  setup(component: ChartComponent): void {
    this.component = component;
  }

}
