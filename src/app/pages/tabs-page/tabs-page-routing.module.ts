import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/app/tabs/marketplace',
        pathMatch: 'full'
      },
      {
        path: 'marketplace',
        children: [
          {
            path: '',
            loadChildren: () => import('../marketplace/marketplace.module').then(m => m.MarketplacePageModule)
          },
          {
            path: 'detail/:id',
            loadChildren: () => import('../marketplace-detail/marketplace-detail.module').then(m => m.MarketplaceDetailPageModule)
          }
        ]
      },
      {
        path: 'friends',
        children: [
          {
            path: '',
            loadChildren: () => import('../friends/friends.module').then(m => m.FriendsPageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: () =>  import('../notifications/notifications.module').then(m => m.NotificationsPageModule)
          }
        ]
      }
    ]
  },
  {
    path: 'profile/:username',
    loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

