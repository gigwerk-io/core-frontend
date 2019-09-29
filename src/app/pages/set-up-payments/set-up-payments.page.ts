import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import {STRIPE_PUBLIC} from '../../providers/constants';
import {FinanceService} from '../../utils/services/finance.service';
import {AlertController, ToastController} from '@ionic/angular';
import {FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';
import {Validators} from '@angular/forms';

@Component({
  selector: 'set-up-payments',
  templateUrl: './set-up-payments.page.html',
  styleUrls: ['./set-up-payments.page.scss'],
})
export class SetUpPaymentsPage implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  constructor(private stripe: Stripe,
              private financeService: FinanceService,
              private toastController: ToastController,
              private alertController: AlertController,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.stripe.setPublishableKey(STRIPE_PUBLIC);
    this.form = this.fb.group({
      creditCard: ['', [<any>CreditCardValidator.validateCCNumber]],
      expirationDate: ['', [<any>CreditCardValidator.validateExpDate]],
      cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]]
    });
  }

  onSubmit(form) {
    this.submitted = true;
    console.log(form);
    let date = this.form.get('expirationDate').value;
    date = date.split('/');
    console.log(date);
    const card = {
      number: this.form.get('creditCard').value,
      expMonth: date[0].trim(),
      expYear: date[1].trim(),
      cvc: this.form.get('cvc').value
    };
    this.stripe.createCardToken(card).then(token => {
      const body = {stripeToken: token.id};
      this.financeService.saveCreditCard(body).subscribe(res => {
        this.presentToast(res.message);
      });
    }).catch(error => this.presentToast(error));
  }


  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      position: 'top',
      duration: 2500,
      color: 'dark',
      showCloseButton: true
    }).then(toast => {
      toast.present();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Missing Field(s)',
      message: 'Please fill out all form inputs.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
