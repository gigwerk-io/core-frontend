import { Component, OnInit } from '@angular/core';
import {ReferralService} from '../../utils/services/referral.service';
import {ReferralSteps} from '../../utils/interfaces/referrals/ReferralSteps';
import {ToastController} from '@ionic/angular';
import {ORIGIN, StorageKeys} from '../../providers/constants';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'refer-a-worker',
  templateUrl: './refer-a-worker.page.html',
  styleUrls: ['./refer-a-worker.page.scss'],
})
export class ReferAWorkerPage implements OnInit {
  remainingSteps: ReferralSteps = {has_profile_description: false, has_profile_photo: false, has_bank_account: false};
  constructor(private referralService: ReferralService,
              private toastController: ToastController,
              private storage: Storage) { }

  ngOnInit() {
    this.getSteps();
  }

  getSteps() {
    this.referralService.getStepsToReferWorkers().subscribe(res => {
      this.remainingSteps = res.steps;
    });
  }

  copyToClipboard() {
    this.storage.get(StorageKeys.PROFILE).then(profile => {
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = `${ORIGIN}/r/${profile.user.username}`;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      this.presentToast('Copied to clipboard.');
    });
  }

  async presentToast(message) {
    await this.toastController.create({
      message: message,
      position: 'bottom',
      duration: 2500,
      color: 'dark',
      showCloseButton: true
    }).then(toast => toast.present());
  }
}
