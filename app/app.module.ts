import { NgModule }       from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent }                     from './app.component';
import { IndexComponent }                   from './index.component';
import { ScoreboardComponent }              from './scoreboard.component';

import { ProblemsApi, TeamsApi, UsersApi }  from './api/api/api';
import { BASE_PATH }                        from './api/variables';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {
                path: 'index',
                component: IndexComponent
            },
            {
                path: 'scoreboard',
                component: ScoreboardComponent
            },
            {
                path: '',
                redirectTo: '/index',
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [
        AppComponent,
        IndexComponent,
        ScoreboardComponent
    ],
    providers: [
        ProblemsApi,
        TeamsApi,
        UsersApi,
        Title,
        { provide: BASE_PATH, useValue: 'http://localhost:8000' }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
