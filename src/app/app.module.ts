/**
 * The root of our application: an Angular module. Importantly, we indicate the routes here and declare which objects
 * are "provided" globally to all Components.
 */

import { NgModule, Injectable } from '@angular/core';
import { BrowserModule, Title }             from '@angular/platform-browser';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }                     from '@angular/router';
import {
  HttpModule, CookieXSRFStrategy, XSRFStrategy, Request, Response,
  XHRBackend, ResponseOptions
}                                           from '@angular/http';
import { BrowserXhr }                       from '@angular/http';
import { Observable }                       from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../environments/environment';

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


/**
 * Override the default HTTP request backend to add error handling using our alert mechanism.
 */
@Injectable()
export class ConnectionRefusedBackend extends XHRBackend {
  constructor(browserXhr: BrowserXhr, responseOptions: ResponseOptions, xsrfStrategy: XSRFStrategy,
              private alert: AlertService) {
    super(browserXhr, responseOptions, xsrfStrategy);
  }

  /**
   * Handle an HTTP connection.
   * @param {Request} request - The HTTP request that's being made.
   * @returns {XHRConnection} - A modified version of the default connection, which catches certain types of errors.
   */
  createConnection(request: Request) {
    // Get the default connection
    let xhrConnection = super.createConnection(request);

    // Modify its response to catch certain types of errors
    xhrConnection.response = xhrConnection.response.catch((error: Response) => {
      if (error.status === 0) this.alert.open("error", "The API server is unreachable.");
      else if (error.status === 500) this.alert.open("error", "The API server experienced an internal server error.");

      // Throw it, so it gets printed nicely to the console
      return Observable.throw(error);
    });

    return xhrConnection;
  }
}

/**
 * Simple class that renames Angular's CSRF token to "X-CSRFToken", which is the default used by Django.
 */
@Injectable()
export class CSRFStrategy extends CookieXSRFStrategy {
  constructor() {
    super('csrftoken', 'X-CSRFToken');
  }

  configureRequest(req: any): void {
    super.configureRequest(req);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    { provide: XHRBackend, useClass: ConnectionRefusedBackend },
    { provide: XSRFStrategy, useClass: CSRFStrategy }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
