import { Injectable } from "@angular/core";
import { UsersApi } from './api/api/api';
import { START_TIME, END_TIME } from './config';

@Injectable()
export class StatusService {
    user: any;
    team: any;

    constructor (private usersApi: UsersApi) {
      this.reload();
    }

    reload(): Promise<any> {
      return this.usersApi.usersStatus().toPromise().then(data => {
        this.update(data);
      });
    }

    login(username: string, password: string): Promise<any> {
        return this.usersApi.usersLogin({
            username: username,
            password: password
        }).toPromise().then(data => {
            this.update(data);
        });
    }

    logout(): Promise<any> {
        return this.usersApi.usersLogout().toPromise().then(data => {
            this.user = null;
            this.update(data);
            return true;
        });
    }

    update(data: any): void {
        this.user = data.user;
        this.team = data.team;
    }

    get started(): boolean {
        return Date.now() > START_TIME;
    }

    get ended(): boolean {
      return Date.now() > END_TIME;
    }
}
