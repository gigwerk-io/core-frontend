import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import {STRIPE_PUBLIC} from '../../providers/constants';

@Component({
  selector: 'set-up-payments',
  templateUrl: './set-up-payments.page.html',
  styleUrls: ['./set-up-payments.page.scss'],
})
export class SetUpPaymentsPage implements OnInit {

  constructor(private stripe: Stripe) { }

  ngOnInit() {
    this.stripe.setPublishableKey(STRIPE_PUBLIC);
  }

  saveCard() {
    // const card = {
    //   number: '4242424242424242',
    //   expMonth: 12,
    //   expYear: 2020,
    //   cvc: '220'
    // };
    //
    // this.stripe.createCardToken(card)
    //   .then(token => console.log(token.id))
    //   .catch(error => console.error(error));
  }
}
