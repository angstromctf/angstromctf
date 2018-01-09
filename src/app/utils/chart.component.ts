import {
  Component, OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { ChartService } from './chart.service';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {

  lines = [];
  maxX = 0;
  minX = 0;
  maxY = 0;
  minY = 0;

	constructor(private chartService: ChartService, private router: Router) { }

  ngOnInit(): void {
    this.chartService.setup(this);
  }

}
