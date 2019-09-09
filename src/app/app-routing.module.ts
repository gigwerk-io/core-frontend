import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule),
  },
  {
    path: 'notification-preferences',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./pages/notification-preferences/notification-preferences.module').then(m => m.NotificationPreferencesPageModule),
  },
  {
    path: 'privacy-preferences',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./pages/privacy-preferences/privacy-preferences.module').then(m => m.PrivacyPreferencesPageModule),
  },
  {
    path: 'saved-locations',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./pages/saved-locations/saved-locations.module').then(m => m.SavedLocationsPageModule),
  },
  {
    path: 'add-location',
    loadChildren: () => import('./pages/add-location/add-location.module').then(m => m.AddLocationPageModule),
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule),
  },
  {
    path: 'account-options',
    loadChildren: () => import('./pages/account-options/account-options.module').then(m => m.AccountOptionsPageModule),
  },
  {
    path: 'manage-cards',
    loadChildren: () => import('./pages/manage-cards/manage-cards.module').then(m => m.ManageCardsPageModule),
  },
  {
    path: 'set-up-payments',
    loadChildren: () => import('./pages/set-up-payments/set-up-payments.module').then(m => m.SetUpPaymentsPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
