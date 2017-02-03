import { CatsService, Cat } from './../../services/cats.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.css']
})
export class CatsListComponent implements OnInit {

  private cats: Cat[];

  constructor(private catsService: CatsService) { }

  ngOnInit() {
    this.catsService.getAll()
    .subscribe(cats => this.cats = cats);
  }

}
