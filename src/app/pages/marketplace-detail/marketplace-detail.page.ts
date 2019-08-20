import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {MainMarketplace} from '../../utils/interfaces/main-marketplace/main-marketplace';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import * as $ from 'jquery';

@Component({
  selector: 'marketplace-detail',
  templateUrl: './marketplace-detail.page.html',
  styleUrls: ['./marketplace-detail.page.scss'],
  providers: [PhotoViewer]
})
export class MarketplaceDetailPage implements OnInit {

  @Input() mainMarketplaceTask: MainMarketplace;

  page = 'main';
  subPageDetail = MarketplaceDetailPage;
  private taskDescriptionDetail: string;
  private taskStatusDisplay: string;

  constructor(private modalCtrl: ModalController,
              private photoViewer: PhotoViewer,
              private navParams: NavParams) { }

  ngOnInit() {
    this.page = this.navParams.get('page') || this.page;
    switch (this.page) {
      case 'main':
        break;
      case 'task-description':
        const descriptionHTML = $('#descriptionButton').val();
        this.taskDescriptionDetail = descriptionHTML;
        break;
    }

    this.taskStatusDisplay = (this.mainMarketplaceTask.status === 'Paid') ? 'Freelancer En-Route' : this.mainMarketplaceTask.status;
  }

  async closeMarketplaceDetailPage(): Promise<boolean> {
    return this.modalCtrl.dismiss();
  }

  private viewAttachedPhoto(url: string, photoTitle?: string): void {
    this.photoViewer.show(url, (photoTitle) ? photoTitle : '');
  }
}
