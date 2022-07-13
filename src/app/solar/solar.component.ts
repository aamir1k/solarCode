import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solar',
  templateUrl: './solar.component.html',
  styleUrls: ['./solar.component.css'],
})
export class SolarComponent implements OnInit {
  images = [
    {
      imageSrc:
        'https://images.unsplash.com/photo-1440940627368-bd68a386bb73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c29sYXIlMjBjZWxsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      imageAlt: 'solar',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXIlMjBjZWxsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      imageAlt: 'solars',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c29sYXIlMjBjZWxsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      imageAlt: 'farm',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
