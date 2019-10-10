import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {
  status = 'good';
  content = 'content';
  items = [];

  constructor() {}

  ngOnInit() {}

  clickme() {
    console.log('click me');
  }

  reset() {
    this.content = '';
  }

  addItem() {
    const input = Math.random() > 0.5 ? 'online' : 'offline';
    this.items.push(input);
  }

  update(event: Event) {
    // console.log(event.target.value);
    this.content = (event.target as HTMLInputElement).value;
  }
}
