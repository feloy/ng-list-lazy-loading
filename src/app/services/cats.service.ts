import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class Cat {
  id: string;
  localUrl: string;
}

@Injectable()
export class CatsService {

  constructor(private http: Http) { }

  getPage(n: number): Observable<Cat[]> {
    return this.http.get('http://localhost:3000/cats?_page=' + n)
      .map(data => data.json());
  }
}
