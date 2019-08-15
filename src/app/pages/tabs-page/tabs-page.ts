import {Component, HostListener} from '@angular/core';

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

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   console.log(this.tabSlot);
  //   console.log(window.innerWidth);
  //   if (window.innerWidth >= 500) {
  //     this.tabSlot = 'top';
  //   } else {
  //     this.tabSlot = 'bottom';
  //   }
  // }
}
