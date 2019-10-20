import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import {STRIPE_PUBLIC} from '../../providers/constants';
import {FinanceService} from '../../utils/services/finance.service';
import {AlertController, Events, ToastController} from '@ionic/angular';
import {FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';
import {Validators} from '@angular/forms';
import {MainMarketplaceTask} from '../../utils/interfaces/main-marketplace/main-marketplace-task';
import {MarketplaceService} from '../../utils/services/marketplace.service';
import {Router} from '@angular/router';

@Component({
  selector: 'set-up-payments',
  templateUrl: './set-up-payments.page.html',
  styleUrls: ['./set-up-payments.page.scss'],
})
export class SetUpPaymentsPage implements OnInit {
  form: FormGroup;
  submitted = false;
  task: MainMarketplaceTask = undefined;

  constructor(private stripe: Stripe,
              private financeService: FinanceService,
              private toastController: ToastController,
              private alertController: AlertController,
              private marketplaceService: MarketplaceService,
              private router: Router,
              private fb: FormBuilder,
              private events: Events) {
    this.events.subscribe('task-request', (taskRequest) => {
      this.task = taskRequest;
    });
  }

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
        if (this.task) {
          this.marketplaceService.createMainMarketplaceRequest(this.task)
            .then(resp => this.presentToast(resp));
          this.router.navigateByUrl('app/tabs/marketplace');
          this.events.unsubscribe('task-request');
        } else {
          this.presentToast(res.message);
        }
      });
    }).catch(error => this.presentToast(error));
  }


  async presentToast(message) {
    await this.toastController.create({
      message: message,
      position: 'top',
      duration: 2500,
      color: 'dark',
      showCloseButton: true
    }).then(toast => toast.present());
  }

  async presentAlert() {
    await this.alertController.create({
      header: 'Missing Field(s)',
      message: 'Please fill out all form inputs.',
      buttons: ['OK']
    }).then(alert => alert.present());
  }
}
