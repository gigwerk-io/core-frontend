import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MarketplaceDetailPage } from './marketplace-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MarketplaceDetailPage]
})
export class MarketplaceDetailPageModule {}
