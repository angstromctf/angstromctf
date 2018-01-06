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

  setLines(lines): void {
    this.component.lines = lines;
  }

  setup(component: ChartComponent): void {
    this.component = component;
  }

}
