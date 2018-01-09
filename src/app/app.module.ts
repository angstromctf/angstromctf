/**
 * The root of our application: an Angular module. Importantly, we indicate the routes here and declare which objects
 * are "provided" globally to all Components.
 */

import { NgModule } from '@angular/core';
import { BrowserModule, Title }             from '@angular/platform-browser';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }                     from '@angular/router';
import {
  HttpClientModule, HttpClientXsrfModule
}                                           from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../environments/environment';

import { AlertComponent }                   from './utils/alert.component';
import { AppComponent }                     from './app.component';
import { ExtendedInputComponent }           from './lib/extended-input.component';
import { AboutComponent }                   from './content/about.component';
import { AccountComponent }                 from './users/account.component';
import { ChartComponent }                   from './utils/chart.component';
import { IndexComponent }                   from './content/index.component';
import { ModalComponent }                   from './utils/modal.component';
import { LoginComponent }                   from './users/login.component';
import { ProblemComponent }                 from './problems/problem.component';
import { ProblemsComponent }                from './problems/problems.component';
import { ProfileComponent }                 from './teams/profile.component';
import { ScoreboardComponent }              from './teams/scoreboard.component';
import { SponsorsComponent }                from './content/sponsors.component';
import { SignupComponent }                  from './users/signup.component';

import { ApiModule }                        from './api/api.module';
import { StatusService }                    from './utils/status.service';
import { AlertService }                     from './utils/alert.service';
import { ModalService }                     from './utils/modal.service';
import { ChartService }                     from './utils/chart.service'
import { OrdinalPipe }                      from './lib/ordinal.pipe';
import { BASE_PATH }                        from './api/variables';


/**
 * Override the default HTTP request backend to add error handling using our alert mechanism.
 */
// @Injectable()
// export class ConnectionRefusedBackend extends HttpXhrBackend {
//   constructor(private alert: AlertService) {
//   }
//
//   /**
//    * Handle an HTTP connection.
//    * @param {HttpRequest} request - The HTTP request that's being made.
//    * @returns {XHRConnection} - A modified version of the default connection, which catches certain types of errors.
//    */
//   createConnection(request: HttpRequest<any>) {
//     // Get the default connection
//     let xhrConnection = super.handle(request);
//
//     // Modify its response to catch certain types of errors
//     xhrConnection.response = xhrConnection.response.catch((error: HttpResponse) => {
//       if (error.status === 0) this.alert.open("error", "The API server is unreachable.");
//       else if (error.status === 500) this.alert.open("error", "The API server experienced an internal server error.");
//
//       // Throw it, so it gets printed nicely to the console
//       return Observable.throw(error);
//     });
//
//     return xhrConnection;
//   }
// }

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ApiModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({ cookieName: "X-CSRFToken" }),
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
    ChartComponent,
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
    Title,
    StatusService,
    AlertService,
    ModalService,
    ChartService,
    { provide: BASE_PATH, useValue: environment.apiUrl }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
