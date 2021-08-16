import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  template: '<h1>Page Not Found</h1>',
  styles: ['h1{color:#FF4500}']
})
export class NotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}