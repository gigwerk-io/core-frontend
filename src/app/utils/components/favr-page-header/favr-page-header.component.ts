import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {StorageConsts} from '../../../providers/constants';

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

  profileUsername: number;
  profileImage: string;

  constructor(private alertCtrl: AlertController,
              private storage: Storage) { }

  ngOnInit() {
    this.storage.get(StorageConsts.PROFILE)
      .then(profile => {
        if (profile) {
          this.profileUsername = profile.user.username;
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
}
