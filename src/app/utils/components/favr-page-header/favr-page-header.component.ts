import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'favr-page-header',
  templateUrl: './favr-page-header.component.html',
  styleUrls: ['./favr-page-header.component.scss'],
})
export class FavrPageHeaderComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() showSearchBar = false;

  constructor() { }

  ngOnInit() {}

}
