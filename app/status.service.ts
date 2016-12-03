import { Injectable } from "@angular/core";
import { UsersApi } from './api/api/api';

@Injectable()
export class StatusService {
    auth: boolean = false;

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
            this.auth = true;
            this.update(data);
            return true;
        }, data => {
            return false;
        });
    }

    logout() : Promise<any> {
        return this.usersApi.usersLogout().toPromise().then(data => {
            this.auth = false;
            this.update(data);
            return true;
        });
    }

    update(status: any) : void {
        this.auth = status.logged_in;
    }
}