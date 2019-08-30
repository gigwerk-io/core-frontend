import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {MainMarketplaceTask} from '../../utils/interfaces/main-marketplace/main-marketplace-task';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import * as $ from 'jquery';
import {ActivatedRoute} from '@angular/router';
import {MarketplaceService} from '../../utils/services/marketplace.service';

@Component({
  selector: 'marketplace-detail',
  templateUrl: './marketplace-detail.page.html',
  styleUrls: ['./marketplace-detail.page.scss'],
  providers: [PhotoViewer]
})
export class MarketplaceDetailPage implements OnInit {

  mainMarketplaceTask: MainMarketplaceTask;

  page = 'main';
  subPageDetail = MarketplaceDetailPage;
  private taskDescriptionDetail: string;
  private taskStatusDisplay: string;

  constructor(private modalCtrl: ModalController,
              private photoViewer: PhotoViewer,
              private activatedRoute: ActivatedRoute,
              private marketplaceService: MarketplaceService) {
    this.activatedRoute.paramMap.subscribe(data => {
      const id: number = parseInt(data.get('id'), 10);
      this.marketplaceService.getSingleMarketplaceRequest(id)
        .subscribe(task => {
          this.mainMarketplaceTask = task;
          this.taskStatusDisplay = (this.mainMarketplaceTask.status === 'Paid') ? 'Freelancer En-Route' : this.mainMarketplaceTask.status;
        });
    });
  }

  ngOnInit() {
    switch (this.page) {
      case 'main':
        break;
      case 'task-description':
        break;
    }
  }

  private viewAttachedPhoto(url: string, photoTitle?: string): void {
    this.photoViewer.show(url, (photoTitle) ? photoTitle : '');
  }
}
