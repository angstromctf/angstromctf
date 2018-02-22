/**
 * Tracks the user's status while the user interacts with the application. Shared between all Components. Specifically,
 * the StatusService keeps track of the user's information and the user's team's information.
 */

import { Injectable } from "@angular/core";
import { UsersService } from '../api/api/api';

@Injectable()
export class StatusService {
  user: any;
  team: any;
  competition: any;

  constructor (private usersService: UsersService) {
    this.reload();
  }

  /**
   * Log the user in.
   * @param {string} username - The user's username.
   * @param {string} password - The user's password.
   * @returns {Promise<any>} - A Promise that completes when the user is logged in.
   */
  login(username: string, password: string): Promise<any> {
    return this.usersService.usersLogin({
      username: username,
      password: password
    }).toPromise().then(status => {
      this.update(status);
    });
  }

  /**
   * Log the user out.
   * @returns {Promise<any>} - A Promise that completes when the user is logged out.
   */
  logout(): Promise<any> {
    return this.usersService.usersLogout().toPromise().then(status => {
      this.user = null;
      this.update(status);
      return true;
    });
  }

  /**
   * Retrieve status information from the API server.
   * @returns {Promise<any>} - A Promise that completes when the status is reloaded.
   */
  reload(): Promise<any> {
    return this.usersService.usersStatus().toPromise().then(status => {
      this.update(status);
    });
  }

  /**
   * Update the user's status.
   *
   * Typically invoked when an action changes something about the user or the team, such as submitting a problem
   * (correctly, so it changes the team's score) or creating a team.
   *
   * @param status - The user's new status
   * @param status.user - Information about the current user
   * @param status.team - Information about the current team
   */
  update(status: any): void {
    this.user = status.user;
    this.team = status.team;
    this.competition = { start: new Date(status.competition.start), end: new Date(status.competition.end) };
  }

  /**
   * Check whether the contest has started.
   * @returns {boolean} - Whether the contest has started.
   */
  get started(): boolean {
    return Date.now() > this.competition.start;
  }

  /**
   * Check whether the contest has ended.
   * @returns {boolean} - Whether the contest has ended.
   */
  get ended(): boolean {
    return Date.now() > this.competition.end;
  }
}
