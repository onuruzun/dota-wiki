import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NodeJsApi {
    constructor(private http: HttpClient) {
    }

    getHero() {
        return this.http.get("http://192.168.1.9:1907/heroesfromfirebase");
    }

}
