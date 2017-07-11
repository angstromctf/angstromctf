import {
  Component, Input, OnInit
} from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { AlertService } from './alert.service';


@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() alerts: any[] = [{}];
  @Input() active: number[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.setup(this);
  }

  alert(title: string, message: string, type: string): number {
    let index: number = this.alerts.length - 1;

    this.alerts[index].title = title;
    this.alerts[index].message = message;
    this.alerts[index].type = type;

    this.alerts.push({});

    this.active.push(index);

    window.setTimeout(() => this.close(index), 5000);

    return index;
  }

  close(alert: number): void {
    this.active.splice(this.active.indexOf(alert), 1);
  }
}
