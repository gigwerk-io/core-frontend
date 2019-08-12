import {Component, Input, OnInit} from '@angular/core';
import {MainMarketplace} from '../../interfaces/main-marketplace/main-marketplace';

@Component({
  selector: 'favr-marketplace-card',
  templateUrl: './favr-marketplace-card.component.html',
  styleUrls: ['./favr-marketplace-card.component.scss'],
})
export class FavrMarketplaceCardComponent implements OnInit {

  @Input() mainMarketplaceTask: MainMarketplace;

  constructor() { }

  ngOnInit() {}

}
