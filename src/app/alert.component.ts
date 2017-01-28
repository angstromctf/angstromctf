import {
  Component, Input, HostBinding, OnInit
} from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { AlertService } from './alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;

  constructor(private alertService: AlertService) { }

  ngOnInit() : void {
    this.alertService.setup(this);
  }
}
