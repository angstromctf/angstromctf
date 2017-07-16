import { NgModule, Injectable } from '@angular/core';
import { BrowserModule, Title }             from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }                     from '@angular/router';
import {
  HttpModule, CookieXSRFStrategy, XSRFStrategy, Request, Response,
  XHRBackend, ResponseOptions, BaseRequestOptions, Headers
}                                           from '@angular/http';
import { BrowserXhr }                       from '@angular/http';
import { Observable }                       from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';import { environment } from '../environments/environment';

import { AlertComponent }                   from './utils/alert.component';
import { AppComponent }                     from './app.component';
import { ExtendedInputComponent }           from './lib/extended-input.component';
import { AboutComponent }                   from './content/about.component';
import { AccountComponent }                 from './users/account.component';
import { IndexComponent }                   from './content/index.component';
import { ModalComponent }                   from './utils/modal.component';
import { LoginComponent }                   from './users/login.component';
import { ProblemComponent }                 from './problems/problem.component';
import { ProblemsComponent }                from './problems/problems.component';
import { ProfileComponent }                 from './teams/profile.component';
import { ScoreboardComponent }              from './teams/scoreboard.component';
import { SponsorsComponent }                from './content/sponsors.component';
import { SignupComponent }                  from './users/signup.component';

import { ProblemsApi, TeamsApi, UsersApi }  from './api/api/api';
import { StatusService }                    from './utils/status.service';
import { AlertService }                     from './utils/alert.service';
import { ModalService }                     from './utils/modal.service';
import { OrdinalPipe }                      from './lib/ordinal.pipe';
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

@Injectable()
export class ConnectionRefusedBackend extends XHRBackend {
  constructor(browserXhr: BrowserXhr, responseOptions: ResponseOptions, xsrfStrategy: XSRFStrategy,
              private alert: AlertService) {
    super(browserXhr, responseOptions, xsrfStrategy);
  }

  createConnection(request: Request) {
    let xhrConnection = super.createConnection(request);

    xhrConnection.response = xhrConnection.response.catch((error: Response) => {
      if (error.status === 0) this.alert.alert("error", "The API server is unreachable.");
      else if (error.status === 500) this.alert.alert("error", "The API server experienced an internal server error.");

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

  configureRequest(req: any): void {
    super.configureRequest(req);
  }
}

@Injectable()
export class CORSRequestOptions extends BaseRequestOptions {
  headers: Headers = new Headers({
    'X-Requested-With': 'XMLHttpRequest'
  });
  withCredentials: boolean = true;
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
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'signups', component: SignupComponent },
      { path: 'sponsors', component: SponsorsComponent },
      { path: 'scoreboard', component: ScoreboardComponent }
    ])
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
    ProfileComponent,
    ScoreboardComponent,
    SponsorsComponent,
    SignupComponent,
    ModalComponent,
    OrdinalPipe
  ],
  entryComponents: [
    LoginComponent,
    ProblemComponent
  ],
  providers: [
    ProblemsApi,
    TeamsApi,
    UsersApi,
    Title,
    StatusService,
    AlertService,
    ModalService,
    { provide: BASE_PATH, useValue: environment.apiUrl },
    { provide: BrowserXhr, useClass: CookieXhr },
    { provide: XHRBackend, useClass: ConnectionRefusedBackend },
    { provide: XSRFStrategy, useClass: CSRFStrategy },
    { provide: BaseRequestOptions, useClass: CORSRequestOptions }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
