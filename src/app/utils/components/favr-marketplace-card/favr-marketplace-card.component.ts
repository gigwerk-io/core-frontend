import {Component, Input, OnInit} from '@angular/core';
import {MainMarketplaceTask} from '../../interfaces/main-marketplace/main-marketplace-task';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'favr-marketplace-card',
  templateUrl: './favr-marketplace-card.component.html',
  styleUrls: ['./favr-marketplace-card.component.scss'],
  providers: [PhotoViewer]
})
export class FavrMarketplaceCardComponent implements OnInit {

  @Input() mainMarketplaceTask: MainMarketplaceTask;

  constructor(private photoViewer: PhotoViewer) { }

  ngOnInit() {}

  private viewAttachedPhoto(url: string, photoTitle?: string): void {
    this.photoViewer.show(url, (photoTitle) ? photoTitle : '');
  }
}
