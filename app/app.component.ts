import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'angstrom-app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent implements OnInit {
    ngOnInit() : void {
        new SwaggerClient({
            url: "http://localhost:8000/api/",
            usePromise: true
        })
        .then(function(client) {
            client.problems.problems_list()
                .then(function(data) {
                    console.log(data);
                })
                .catch(function(error) {
                    console.log('Oops!  failed with message: ' + error.statusText);
                });
        });
    }
}
