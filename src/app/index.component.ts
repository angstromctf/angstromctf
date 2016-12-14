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

    constructor(private title: Title) { }

    ngOnInit(): void {
        this.title.setTitle("ångstromCTF");

        if (Date.now() > START_TIME) var secs = Math.floor((END_TIME - Date.now()) / 1000);
        else var secs = Math.floor((START_TIME - Date.now()) / 1000);

        for (var i = 3; i >= 0; i--) {
            this.time[i] = secs % this.DURATIONS[i];
            secs = Math.floor(secs / this.DURATIONS[i]);
        }

        setInterval(() => {
            for (var i = 3; i >= 0; i--) {
                this.time[i] -= 1;

                if (this.time[i] < 0) this.time[i] = this.DURATIONS[i] - 1;
                else break;
            }
        }, 1000);
    }
}
