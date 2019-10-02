import { Component, OnInit } from '@angular/core';
import {PreferencesService} from '../../utils/services/preferences.service';
import {Locations} from '../../utils/interfaces/settings/preferences';
import {ActionSheetController, ToastController} from '@ionic/angular';

@Component({
  selector: 'saved-locations',
  templateUrl: './saved-locations.page.html',
  styleUrls: ['./saved-locations.page.scss'],
})
export class SavedLocationsPage implements OnInit {

  locations: Locations[];
  constructor(private preferences: PreferencesService,
              public actionSheetController: ActionSheetController,
              private toastController: ToastController) { }

  async presentActionSheet(id) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Make Default',
        icon: 'checkmark',
        handler: () => {
          this.preferences.makeDefaultLocation(id).subscribe(res => {
            this.getLocations();
            this.presentToast(res.message);
          });
        }
      }, {
        text: 'Remove',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.preferences.deleteLocation(id).subscribe(res => {
            this.getLocations();
            this.presentToast(res.message);
          });
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {}
      }]
    });
    await actionSheet.present();
  }

  async presentToast(message) {
    await this.toastController.create({
      message: message,
      position: 'top',
      duration: 2500,
      color: 'dark',
      showCloseButton: true
    }).then(toast => {
      toast.present();
    });
  }

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.preferences.getMyLocations().subscribe(res => {
      this.locations = res.locations;
      console.log(this.locations);
    });
  }
}
