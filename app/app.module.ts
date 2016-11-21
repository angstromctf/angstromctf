import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent }                     from './app.component';
import { ScoreboardComponent }              from './scoreboard.component';
import { ProblemsApi, TeamsApi, UsersApi }  from './api/api/api';
import { BASE_PATH }                        from './api/variables';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        ScoreboardComponent
    ],
    providers: [
        ProblemsApi,
        TeamsApi,
        UsersApi,
        { provide: BASE_PATH, useValue: 'http://localhost:8000' }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
