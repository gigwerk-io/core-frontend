import {Component, Input, OnInit} from '@angular/core';
// @ts-ignore
import {MainMarketplaceTask} from '../../interfaces/main-marketplace/main-marketplace-task';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import {ModalController} from '@ionic/angular';
import {MarketplaceDetailPage} from '../../../pages/marketplace-detail/marketplace-detail.page';
import {popInAnimation} from '../../animations/enter.animation';
import {popOutAnimation} from '../../animations/leave.animation';

@Component({
  selector: 'favr-marketplace-card',
  templateUrl: './favr-marketplace-card.component.html',
  styleUrls: ['./favr-marketplace-card.component.scss'],
  providers: [PhotoViewer]
})
export class FavrMarketplaceCardComponent implements OnInit {

  @Input() mainMarketplaceTask: MainMarketplaceTask;

  constructor(private photoViewer: PhotoViewer,
              private modalCtrl: ModalController) { }

  ngOnInit() {}

  private viewAttachedPhoto(url: string, photoTitle?: string): void {
    this.photoViewer.show(url, (photoTitle) ? photoTitle : '');
  }

  private async viewMarketplaceDetail(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: MarketplaceDetailPage,
      componentProps: {'mainMarketplaceTask' : this.mainMarketplaceTask},
      // enterAnimation: popInAnimation,
      // leaveAnimation: popOutAnimation
    });
    return await modal.present();
  }
}
