import { Component, OnInit, HostListener } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';

import { CatsService, Cat } from './../../services/cats.service';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.css']
})
export class CatsListComponent implements OnInit {

  private cats: Cat[];
  private nPages: number;
  private loadNewPage$ = new Subject();
  private loadingMutex: boolean;

  constructor(private catsService: CatsService) { }


  ngOnInit() {
    this.nPages = 1;
    this.cats = [];
    this.loadingMutex = false;
    this.loadNewPage$
      .subscribe(e => {
        this.loadNewPage();
      });
    this.loadNewPage$.next();
  }

  private loadNewPage() {
    this.loadingMutex = true;
    this.catsService.getPage(this.nPages)
      .subscribe(cats => {
        if (cats.length) {
          this.cats.push(...cats);
          this.nPages++;
          this.loadingMutex = false;
        }
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(e) {
    const height = e.target.body.scrollHeight;
    const top = e.target.body.scrollTop;
    const parentHeight = window.innerHeight;
    if (top >= height - parentHeight) {
      if (!this.loadingMutex) {
        this.loadNewPage$.next();
      }
    }
  }

}
