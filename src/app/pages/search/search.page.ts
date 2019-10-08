import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSearchbar, ModalController} from '@ionic/angular';

@Component({
  selector: 'search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  // @ts-ignore
  @ViewChild(IonSearchbar) searchBar: IonSearchbar;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    setTimeout(() => this.searchBar.setFocus(), 350);
  }

  async closeSearchPage() {
    await this.modalCtrl.dismiss();
  }
}
