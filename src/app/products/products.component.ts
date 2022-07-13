import { Route } from '0/@angular/router';
import { Component, OnInit } from '@angular/core';
import { AboutUsComponent } from '../about-us/about-us.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];

  constructor() {}

  ngOnInit(): void {}

  countStar(star: number) {
    console.log('value odf star', star);
  }
}
