import {Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRegistrationOptions } from '../../utils/interfaces/user-options';
import {AuthService} from '../../utils/services/auth.service';
import {IonContent, IonSlides, NavController} from '@ionic/angular';
import {State} from '../../utils/interfaces/locations/state';
import {STATES} from '../../utils/mocks/states.mock';
import {setProgress} from '../request/request.page';

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
      this.signup.street_address,
      this.signup.city,
      this.signup.state,
      this.signup.zip
    ]);

    console.log(this.progress);
  }
}
