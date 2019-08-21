import {Component} from '@angular/core';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {

  tabSlot: string;

  constructor() {
    if (window.innerWidth >= 500) {
      this.tabSlot = 'top';
    } else {
      this.tabSlot = 'bottom';
    }
  }
}
