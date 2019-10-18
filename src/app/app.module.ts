import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {AuthModule} from './auth/auth.module';
import {FormsModule, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {PusherServiceProvider} from './providers/pusher.service';
import {MomentModule} from 'ngx-moment';
import {Stripe} from '@ionic-native/stripe/ngx';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { Intercom } from '@ionic-native/intercom/ngx';
import { IntercomModule } from 'ng-intercom';
import { Push } from '@ionic-native/push/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Contacts} from '@ionic-native/contacts/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';


@NgModule({
  imports: [
    AuthModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    MomentModule,
    CreditCardDirectivesModule,
    ReactiveFormsModule,
    IntercomModule.forRoot({
      appId: 'yvoar9nd', // from your Intercom config
      updateOnRouterChange: true // will automatically run `update` on router event changes. Default: `false`
    })
  ],
  declarations: [AppComponent],
  providers: [
    InAppBrowser,
    SplashScreen,
    StatusBar,
    PusherServiceProvider,
    Stripe,
    Push,
    FormBuilder,
    Intercom,
    SocialSharing,
    Contacts,
    GoogleAnalytics
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
