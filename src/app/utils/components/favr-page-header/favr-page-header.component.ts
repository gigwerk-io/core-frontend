import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'favr-page-header',
  templateUrl: './favr-page-header.component.html',
  styleUrls: ['./favr-page-header.component.scss'],
})
export class FavrPageHeaderComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() showSearchBar = false;
  @Input() isModal = false;
  @Input() showProfile = true;

  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  closePage(): void {
    if (this.isModal) {
      return this.close.emit(true);
    } else {
      return this.close.emit(false);
    }
  }

  async presentFilterOptions() {
    return;
  }
}
