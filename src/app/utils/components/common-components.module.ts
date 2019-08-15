import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {FavrMarketplaceCardComponent} from './favr-marketplace-card/favr-marketplace-card.component';
import {FavrPageHeaderComponent} from './favr-page-header/favr-page-header.component';
import {RouterModule} from '@angular/router';

const COMPONENTS = [
  FavrMarketplaceCardComponent,
  FavrPageHeaderComponent
];

const MODULES = [
  CommonModule,
  FormsModule,
  IonicModule,
  RouterModule
];

@NgModule({
  imports: [...MODULES],
  exports: [...COMPONENTS, ...MODULES],
  declarations: [...COMPONENTS]
})
export class CommonComponentsModule {}
