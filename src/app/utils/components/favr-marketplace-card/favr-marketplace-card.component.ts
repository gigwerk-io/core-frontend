import {Component, Input, OnInit} from '@angular/core';
import {MainMarketplace} from '../../interfaces/main-marketplace/main-marketplace';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import {PhotoViewerOptions} from '@ionic-native/photo-viewer';

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

  private viewAttachedPhoto(url: string, photoTitle?: string, photoViewingOptions?: PhotoViewerOptions): void {
    if (photoTitle && photoViewingOptions) {
      this.photoViewer.show(url, photoTitle, photoViewingOptions);
    } else if (photoTitle) {
      this.photoViewer.show(url, photoTitle);
    } else if (photoViewingOptions) {
      this.photoViewer.show(url, '', photoViewingOptions);
    } else {
      this.photoViewer.show(url);
    }
  }
}
