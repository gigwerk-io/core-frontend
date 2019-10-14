import { Component, OnInit } from '@angular/core';
import {City} from '../../utils/interfaces/locations/city';
import {CITIES} from '../../utils/mocks/cities.mock';
import {PreferencesService} from '../../utils/services/preferences.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'select-city',
  templateUrl: './select-city.page.html',
  styleUrls: ['./select-city.page.scss'],
})
export class SelectCityPage implements OnInit {

  cities: City[];
  current;
  constructor(private preferencesService: PreferencesService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.getCurrentCity();
    this.cities = CITIES;
  }

  selectCity(city: City) {
    this.preferencesService.selectCity(city.id).subscribe(res => {
      this.current = city.id;
      this.presentToast(res.message);
    });
  }

  getCurrentCity() {
    this.preferencesService.currentCity().subscribe(res => {
      this.current = res.id;
    });
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
}
