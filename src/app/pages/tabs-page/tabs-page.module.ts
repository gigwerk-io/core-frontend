import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';
import { MapModule } from '../map/map.module';
import { MarketplacePageModule } from '../marketplace/marketplace.module';
import {FriendsPageModule} from '../friends/friends.module';
import {RequestPageModule} from '../request/request.module';
import {SettingsPageModule} from '../settings/settings.module';
import {MarketplaceDetailPageModule} from '../marketplace-detail/marketplace-detail.module';

const MODULES = [
  CommonModule,
  FriendsPageModule,
  IonicModule,
  MapModule,
  MarketplacePageModule,
  MarketplaceDetailPageModule,
  RequestPageModule,
  SettingsPageModule,
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
