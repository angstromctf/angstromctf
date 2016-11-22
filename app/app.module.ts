import { NgModule }       from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgbModule }                        from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }                     from './app.component';
import { IndexComponent }                   from './index.component';
import { ScoreboardComponent }              from './scoreboard.component';
import { ProblemsComponent }                from './problems.component';
import { AboutComponent }                   from './about.component';
import { LoginComponent }                   from './login.component';

import { ProblemsApi, TeamsApi, UsersApi }  from './api/api/api';
import { BASE_PATH }                        from './api/variables';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot([
            { path: 'scoreboard', component: ScoreboardComponent },
            { path: 'problems', component: ProblemsComponent },
            { path: 'about', component: AboutComponent },
            { path: 'login', component: LoginComponent },
            { path: '', component: IndexComponent }
        ]),
        NgbModule.forRoot()
    ],
    declarations: [
        AppComponent,
        IndexComponent,
        ScoreboardComponent,
        ProblemsComponent,
        AboutComponent,
        LoginComponent
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
