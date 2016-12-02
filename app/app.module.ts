import { NgModule, Injectable }             from '@angular/core';
import { BrowserModule, Title }             from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }                     from '@angular/router';
import { HttpModule, CookieXSRFStrategy, XSRFStrategy }                       from '@angular/http';
import { NgbModule }                        from '@ng-bootstrap/ng-bootstrap';
import { BrowserXhr }                       from '@angular/http';

import { AppComponent }                     from './app.component';
import { IndexComponent }                   from './index.component';
import { ScoreboardComponent }              from './scoreboard.component';
import { ProblemsComponent }                from './problems.component';
import { AboutComponent }                   from './about.component';
import { LoginComponent }                   from './login.component';
import { SignupComponent }                  from './signup.component';
import { LogoutComponent }                  from './logout.component';

import { ProblemsApi, TeamsApi, UsersApi }  from './api/api/api';
import { StatusService }                    from './status.service';
import { BASE_PATH }                        from './api/variables';

@Injectable()
export class CookieXhr extends BrowserXhr {
    constructor() {
        super();
    }

    build(): any {
        let xhr = super.build();
        xhr.withCredentials = true;
        return <any>(xhr);
    }
}

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
            { path: 'logout', component: LogoutComponent },
            { path: 'signup', component: SignupComponent },
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
        LoginComponent,
        LogoutComponent,
        SignupComponent
    ],
    providers: [
        ProblemsApi,
        TeamsApi,
        UsersApi,
        Title,
        StatusService,
        { provide: BASE_PATH, useValue: 'http://localhost:8000' },
        { provide: BrowserXhr, useClass: CookieXhr },
        { provide: XSRFStrategy, useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken') }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
