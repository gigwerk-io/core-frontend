import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'favr-page-header',
  templateUrl: './favr-page-header.component.html',
  styleUrls: ['./favr-page-header.component.scss'],
})
export class FavrPageHeaderComponent implements OnInit {
  // search: string;
  @Input() pageTitle: string;
  @Input() showSearchBar = false;
  @Output() handleSearch = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  onKey(event: any) {
    this.handleSearch.emit(event.target.value);
  }
}
