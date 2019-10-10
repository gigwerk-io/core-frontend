import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {StorageConsts} from '../../../providers/constants';
import {popInAnimation} from '../../animations/enter.animation';
import {popOutAnimation} from '../../animations/leave.animation';
import {SearchPage} from '../../../pages/search/search.page';

@Component({
  selector: 'favr-page-header',
  templateUrl: './favr-page-header.component.html',
  styleUrls: ['./favr-page-header.component.scss'],
})
export class FavrPageHeaderComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() showSearchBar = false;
  @Input() isModal = false;
  @Input() showProfile = true;
  @Input() showBackButton = false;
  @Input() progress: number;
  @Input() filterDefault: string;
  @Input() filterInputs: any[];

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() filterOption: EventEmitter<string> = new EventEmitter<string>();
  @Output() handleSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() navigateForward: EventEmitter<boolean> = new EventEmitter<boolean>();

  profileImage: string;
  profileId: number;

  constructor(private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private navCtrl: NavController,
              private storage: Storage) { }

  ngOnInit() {
    this.storage.get(StorageConsts.PROFILE)
      .then(profile => {
        if (profile) {
          this.profileId = profile.user_id;
          this.profileImage = profile.image;
        }
      });
  }

  closePage(): void {
    if (this.isModal) {
      return this.close.emit(true);
    } else {
      return this.close.emit(false);
    }
  }

  async presentFilterOptions() {
    this.filterInputs.forEach(input => {
      input.checked = this.filterDefault === input.value;
    });

    const alertFilter = await this.alertCtrl.create(
      {
        header: 'Filter Marketplace',
        inputs: [...this.filterInputs],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {}
          }, {
            text: 'Ok',
            handler: (filterOption) => {
              this.filterDefault = filterOption;
              this.filterOption.emit(filterOption);
            }
          }
        ]
      });

    await alertFilter.present();
  }

  onKeyEnter(event) {
    this.handleSearch.emit(event.target.value);
  }

  navigateToChat() {
    this.navCtrl.navigateForward('/app/chat');
    this.navigateForward.emit(true);
  }

  navigateToProfile() {
    this.navCtrl.navigateForward(`/app/profile/${this.profileId}`);
    this.navigateForward.emit(true);
  }

  async openSearchModal() {
    const modal = await this.modalCtrl.create({
      component: SearchPage,
      componentProps: {'isModal': true},
      cssClass: 'transparent-modal',
      enterAnimation: popInAnimation,
      leaveAnimation: popOutAnimation
    });

    modal.present();
  }
}
