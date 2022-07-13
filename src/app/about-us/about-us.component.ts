import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  // myThumbnail = '../../assets/21.jpg';
  // myFullresImage = '../../assets/21.jpg';

  constructor(public router: Router) {}
  newChange(): void {
    this.router.navigateByUrl('/products');
  }

  ngOnInit(): void {}
}
