import { NgModule, Injectable } from '@angular/core';
import { BrowserModule, Title }             from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }                     from '@angular/router';
import {
    HttpModule, CookieXSRFStrategy, XSRFStrategy, Request, Response,
    XHRBackend, ResponseOptions
}                                           from '@angular/http';
import { NgbModule }                        from '@ng-bootstrap/ng-bootstrap';
import { BrowserXhr }                       from '@angular/http';
import { Observable }                       from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AlertComponent }                   from './alert.component';
import { AppComponent }                     from './app.component';
import { ExtendedInputComponent }           from './extended-input.component';
import { AboutComponent }                   from './about.component';
import { AccountComponent }                 from './account.component';
import { IndexComponent }                   from './index.component';
import { ModalComponent }                   from './modal.component';
import { LoginComponent }                   from './login.component';
import { ProblemComponent }                 from './problem.component';
import { ProblemsComponent }                from './problems.component';
import { ScoreboardComponent }              from './scoreboard.component';
import { SignupComponent }                  from './signup.component';

import { ProblemsApi, TeamsApi, UsersApi }  from './api/api/api';
import { StatusService }                    from './status.service';
import { AlertService }                     from './alert.service';
import { ModalService }                     from './modal.service';
import { BASE_PATH }                        from './api/variables';
import { API_LOCATION }                     from './config';

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

@Injectable()
export class ConnectionRefusedBackend extends XHRBackend {
    constructor(browserXhr: BrowserXhr, responseOptions: ResponseOptions, xsrfStrategy: XSRFStrategy,
      private alertService: AlertService) {
        super(browserXhr, responseOptions, xsrfStrategy);
    }

    createConnection(request: Request) {
        let xhrConnection = super.createConnection(request);

        xhrConnection.response = xhrConnection.response.catch((error: Response) => {
            if (error.status === 0) {
                this.alertService.alert("Error!", "The API server is unreachable.", "error");
            }

            return Observable.throw(error);
        });

        return xhrConnection;
    }
}

@Injectable()
export class CSRFStrategy extends CookieXSRFStrategy {
  constructor() {
    super('csrftoken', 'X-CSRFToken');
  }

  configureRequest(req: any) : void {
    super.configureRequest(req);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: IndexComponent },
      { path: 'account', component: AccountComponent },
      { path: 'about', component: AboutComponent },
      { path: 'login', component: LoginComponent },
      { path: 'problems', component: ProblemsComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'scoreboard', component: ScoreboardComponent }
    ]),
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ExtendedInputComponent,
    AboutComponent,
    AlertComponent,
    AccountComponent,
    IndexComponent,
    LoginComponent,
    ProblemComponent,
    ProblemsComponent,
    SignupComponent,
    ModalComponent,
    ScoreboardComponent,
  ],
  providers: [
    ProblemsApi,
    TeamsApi,
    UsersApi,
    Title,
    StatusService,
    AlertService,
    ModalService,
    { provide: BASE_PATH, useValue: API_LOCATION },
    { provide: BrowserXhr, useClass: CookieXhr },
    { provide: XHRBackend, useClass: ConnectionRefusedBackend },
    { provide: XSRFStrategy, useClass: CSRFStrategy }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
