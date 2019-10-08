import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';
import { MarketplacePageModule } from '../marketplace/marketplace.module';
import {FriendsPageModule} from '../friends/friends.module';
import {RequestPageModule} from '../request/request.module';
import {SettingsPageModule} from '../settings/settings.module';
import {MarketplaceDetailPageModule} from '../marketplace-detail/marketplace-detail.module';
import {SearchPageModule} from '../search/search.module';

const MODULES = [
  CommonModule,
  FriendsPageModule,
  IonicModule,
  MarketplacePageModule,
  MarketplaceDetailPageModule,
  RequestPageModule,
  SettingsPageModule,
  SearchPageModule,
  TabsPageRoutingModule,
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
