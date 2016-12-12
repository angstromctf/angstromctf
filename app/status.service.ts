import { Injectable } from "@angular/core";
import { UsersApi } from './api/api/api';
import { START_TIME } from './config';

@Injectable()
export class StatusService {
    user: any;

    constructor (private usersApi: UsersApi) {
        this.usersApi.usersStatus().toPromise().then(data => {
            this.update(data);
        });
    }

    login(username: string, password: string) : Promise<any> {
        return this.usersApi.usersLogin({
            username: username,
            password: password
        }).toPromise().then(data => {
            this.update(data);
            return true;
        }, data => {
            return false;
        });
    }

    logout() : Promise<any> {
        return this.usersApi.usersLogout().toPromise().then(data => {
            this.user = null;
            this.update(data);
            return true;
        });
    }

    update(data: any) : void {
        this.user = data.user;
    }

    get started(): boolean {
        console.log(Date.now());
        console.log(START_TIME);
        return Date.now() > START_TIME;
    }
}