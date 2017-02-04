import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/sample';

import { CatsService, Cat } from './../../services/cats.service';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.css']
})
export class CatsListComponent implements OnInit {

  private cats: Cat[];
  private nPages: number;
  private loading = false;
  private loadReady$ = new Subject();
  private loadNewPage$ = new Subject();

  constructor(private catsService: CatsService) { }


  ngOnInit() {
    this.nPages = 1;
    this.cats = [];

    // * A loadReady$ is emitted at startup and after next page loaded successfully.
    // * a loadNewPage$ is emitted each time the page is scrolled to the bottom.
    // * loadNewPage$ serves as sample:
    //   'sample' operator emits latest (if any) loadReady$ every time a loadNewPage$ is emitted
    // * An *empty* loaded page does not emit loadReady$ so 'sample' operator
    //   never emits after the latest page is loaded
    this.loadReady$.sample(this.loadNewPage$)
      .subscribe(e => {
        this.loading = true;
        this.loadNewPage();
      });
    this.loadReady$.next();
    this.loadNewPage$.next();
  }

  private loadNewPage() {
    this.catsService.getPage(this.nPages)
      .subscribe(cats => {
        this.loading = false;
        if (cats.length) {
          this.cats.push(...cats);
          this.nPages++;
          this.loadReady$.next();
        }
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(e) {
    const height = e.target.body.scrollHeight;
    const top = e.target.body.scrollTop;
    const parentHeight = window.innerHeight;
    if (top >= height - parentHeight) {
      this.loadNewPage$.next();
    }
  }

}
