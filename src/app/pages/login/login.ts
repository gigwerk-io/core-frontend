import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserOptions } from '../../utils/interfaces/user-options';
import {AuthService} from '../../utils/services/auth.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    private authService: AuthService,
    public navCtrl: NavController
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.authService.login(this.login)
        .subscribe(res => {
          console.log(res);
          this.navCtrl.navigateRoot('/app/tabs/marketplace');
        });
    }
  }
}
