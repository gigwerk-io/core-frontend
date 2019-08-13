import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MarketplacePage } from './marketplace.page';
import { FavrMarketplaceCardComponent } from '../../components/favr-marketplace-card/favr-marketplace-card.component';

const COMPONENTS = [
  FavrMarketplaceCardComponent
];

const routes: Routes = [
  {
    path: '',
    component: MarketplacePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MarketplacePage, ...COMPONENTS]
})
export class MarketplacePageModule {}
