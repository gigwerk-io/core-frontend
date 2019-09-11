import {Component, Input, OnInit} from '@angular/core';
import {MainMarketplaceTask} from '../../interfaces/main-marketplace/main-marketplace-task';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import {LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'favr-marketplace-card',
  templateUrl: './favr-marketplace-card.component.html',
  styleUrls: ['./favr-marketplace-card.component.scss'],
  providers: [PhotoViewer]
})
export class FavrMarketplaceCardComponent implements OnInit {

  @Input() mainMarketplaceTask: MainMarketplaceTask;

  constructor(private photoViewer: PhotoViewer,
              private loadingCtrl: LoadingController,
              private router: Router) { }

  ngOnInit() {}

  private viewAttachedPhoto(url: string, photoTitle?: string): void {
    this.photoViewer.show(url, (photoTitle) ? photoTitle : '');
  }

  async loadMarketplaceDetail(id: number): Promise<boolean> {
    const loadingMarketplaceDetail = await this.loadingCtrl.create({
      message: 'Please wait...',
      translucent: true
    });

    await loadingMarketplaceDetail.present();

    return this.router.navigateByUrl('/app/tabs/marketplace/detail/' + id)
      .then(() => loadingMarketplaceDetail.dismiss());
  }
}
