import {Component, Input, OnInit} from '@angular/core';
import {MainMarketplace} from '../../interfaces/main-marketplace/main-marketplace';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import {PhotoViewerOptions} from '@ionic-native/photo-viewer';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'favr-marketplace-card',
  templateUrl: './favr-marketplace-card.component.html',
  styleUrls: ['./favr-marketplace-card.component.scss'],
  providers: [PhotoViewer]
})
export class FavrMarketplaceCardComponent implements OnInit {

  @Input() mainMarketplaceTask: MainMarketplace;

  constructor(private photoViewer: PhotoViewer) { }

  ngOnInit() {}

  private viewAttachedPhoto(url: string, photoTitle?: string): void {
    this.photoViewer.show(url, photoTitle);
  }
}
