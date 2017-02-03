import { Cat } from './../../services/cats.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {
  @Input('cat') cat: Cat;

  constructor() { }

  ngOnInit() {
  }

}
