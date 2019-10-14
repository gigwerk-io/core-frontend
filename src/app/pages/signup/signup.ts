import {Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRegistrationOptions } from '../../utils/interfaces/user-options';
import {AuthService} from '../../utils/services/auth.service';
import {IonContent, IonSlides, NavController, Platform, ToastController} from '@ionic/angular';
import {State} from '../../utils/interfaces/locations/state';
import {STATES} from '../../utils/mocks/states.mock';
import {setProgress} from '../request/request.page';
import {Push, PushObject, PushOptions} from '@ionic-native/push/ngx';
import {NotificationService} from '../../utils/services/notification.service';
import {PreferencesService} from '../../utils/services/preferences.service';
import {City} from '../../utils/interfaces/locations/city';
import {CITIES} from '../../utils/mocks/cities.mock';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {

  @ViewChild(IonSlides, {static: false}) slides: IonSlides;
  @ViewChild(IonContent, {static: false}) content: IonContent;

  signup: UserRegistrationOptions = {
    first_name: undefined,
    last_name: undefined,
    username: undefined,
    email: undefined,
    phone: undefined,
    birthday: undefined,
    password: undefined,
    confirm_password: undefined,
    freelancer: false,
    city_id: undefined,
    street_address: undefined,
    city: undefined,
    state: undefined,
    zip: undefined
  };
  submitted = false;
  maxYear = (new Date()).getFullYear() - 13;
  states: State[] = STATES;
  progress = 0;
  pageTitle = 'Sign Up';
  cities: City[] = CITIES;

  constructor(
    private authService: AuthService,
    public navCtrl: NavController,
    private toastController: ToastController,
    private push: Push,
    private notficationService: NotificationService,
    private platform: Platform,
    private perferencesService: PreferencesService
  ) { }

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.authService.register(this.signup)
        .subscribe(() => {
          this.authService.login({username: this.signup.username, password: this.signup.password}).subscribe(() => {
            this.navCtrl.navigateRoot('/app/tabs/marketplace').then(() => {
              this.initPushNotification();
            });
          });
          }, error => {
          this.presentToast(error.error.message);
        });
    }
  }

  async presentToast(message) {
    await this.toastController.create({
      message: message,
      position: 'top',
      duration: 2500,
      color: 'dark',
      showCloseButton: true
    }).then(toast => {
      toast.present();
    });
  }

  onSlideChange() {
    this.slides.getActiveIndex()
      .then((index) => {
        switch (index) {
          case 0:
            this.pageTitle = 'Sign Up';
            this.content.scrollToTop(500);
            break;
          case 1:
            this.pageTitle = 'Security';
            this.content.scrollToTop(500);
            break;
          case 2:
            this.pageTitle = 'Location';
            this.content.scrollToTop(500);
            break;
        }
      });
  }

  updateProgress() {
    this.progress = setProgress([
      this.signup.first_name,
      this.signup.last_name,
      this.signup.email,
      this.signup.username,
      this.signup.password,
      this.signup.confirm_password,
      this.signup.phone,
      this.signup.birthday,
      this.signup.city_id
    ]);
  }

  selectCity(city: City) {
    this.signup.city_id = city.id;
    this.updateProgress();
    this.content.scrollToBottom(1000);
  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }

    const options: PushOptions = {
      android: {
        sound: true
      },
      ios: {
        alert: true,
        badge: true,
        sound: true
      }
    };
    if (!(this.platform.is('pwa') && this.platform.is('ios'))) {
      const pushObject: PushObject = this.push.init(options);
      pushObject.on('registration').subscribe((data: any) => {
        console.log('Token: ' + data.registrationId);
        if (this.platform.is('ios')) {
          this.notficationService.saveAPNToken({'device_token': data.registrationId}).subscribe(res => {
            console.log(res);
          });
        } else if (this.platform.is('android')) {
          this.notficationService.saveFCMToken({'device_token': data.registrationId}).subscribe(res => {
            console.log(res);
          });
        }
      }, error1 => {
        console.log(error1);
      });
    }
  }
}
