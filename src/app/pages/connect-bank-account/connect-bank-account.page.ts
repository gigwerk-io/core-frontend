import { Component, OnInit } from '@angular/core';
import {FinanceService} from '../../utils/services/finance.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'connect-bank-account',
  templateUrl: './connect-bank-account.page.html',
  styleUrls: ['./connect-bank-account.page.scss'],
})
export class ConnectBankAccountPage implements OnInit {

  constructor(private financeService: FinanceService, private iab: InAppBrowser) { }

  ngOnInit() {
    this.financeService.saveBankAccount().subscribe(res => {
      // this.iab.create(res.url);
      window.open(res.url);
    });
  }

}
