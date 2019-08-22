import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {FavrMarketplaceCardComponent} from './favr-marketplace-card/favr-marketplace-card.component';
import {FavrPageHeaderComponent} from './favr-page-header/favr-page-header.component';
import {RouterModule} from '@angular/router';
import {FavrCategoryCardButtonsComponent} from './favr-category-card-buttons/favr-category-card-buttons.component';
import {FavrInputComponent} from './favr-input/favr-input.component';
import {FavrSelectComponent} from './favr-select/favr-select.component';
import {FavrDatetimeComponent} from './favr-datetime/favr-datetime.component';

const COMPONENTS = [
  FavrCategoryCardButtonsComponent,
  FavrDatetimeComponent,
  FavrInputComponent,
  FavrMarketplaceCardComponent,
  FavrPageHeaderComponent,
  FavrSelectComponent
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
