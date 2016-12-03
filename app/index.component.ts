import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
    moduleId: module.id,
    selector: 'angstrom-index',
    templateUrl: 'index.component.html',
})
export class IndexComponent implements OnInit {
    UNITS: string[] = ["days", "hours", "minutes", "seconds"];
    DURATIONS: number[] = [100, 24, 60, 60];
    time: number[] = [0, 0, 0, 0];

    constructor(private title: Title) { }

    ngOnInit(): void {
        this.title.setTitle("ångstromCTF");

        var secs = Math.floor((Date.parse("Mar 11, 2017") - Date.now()) / 1000);

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