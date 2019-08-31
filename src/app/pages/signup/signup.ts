import {Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistrationOptions } from '../../utils/interfaces/user-options';
import {AuthService} from '../../utils/services/auth.service';
import {IonContent, IonSlides, NavController} from '@ionic/angular';
import {State} from '../../utils/interfaces/locations/state';
import {STATES} from '../../utils/mocks/states.mock';



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
  maxYear = (new Date()).getFullYear() - 12;
  states: State[] = STATES;
  progress = 0;
  pageTitle = 'Sign Up';

  constructor(
    private authService: AuthService,
    public navCtrl: NavController
  ) { }

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.authService.register(this.signup)
        .subscribe(() => this.navCtrl.navigateRoot('/app/tabs/marketplace'));
    }
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

  setProgress() {
    this.progress = 0;

    if (this.signup.first_name) {
      this.progress = 1 / 12;
    }

    if (this.signup.last_name) {
      this.progress = 2 / 12;
    }

    if (this.signup.username) {
      this.progress = 3 / 12;
    }

    if (this.signup.email) {
      this.progress = 4 / 12;
    }

    if (this.signup.phone) {
      this.progress = 5 / 12;
    }

    if (this.signup.birthday) {
      this.progress = 6 / 12;
    }

    if (this.signup.password) {
      this.progress = 7 / 12;
    }

    if (this.signup.confirm_password) {
      this.progress = 8 / 12;
    }

    if (this.signup.street_address) {
      this.progress = 9 / 12;
    }

    if (this.signup.city) {
      this.progress = 10 / 12;
    }

    if (this.signup.state) {
      this.progress = 11 / 12;
    }

    if (this.signup.zip) {
      this.progress = 12 / 12;
    }
  }
}
