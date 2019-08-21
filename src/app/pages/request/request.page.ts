import {Component, EventEmitter, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {IonSlides, ModalController} from '@ionic/angular';
import {MainCategory} from '../../utils/interfaces/main-marketplace/main-category';
import {TASK_CATEGORIES} from '../../utils/mocks/mock-categories.mock';

@Component({
  selector: 'request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  @Input() isModal = false;
  @ViewChild(IonSlides, {static: false}) slides: IonSlides;
  categories: MainCategory[] = TASK_CATEGORIES;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  private async closeRequestPage(): Promise<boolean> {
    return this.modalCtrl.dismiss();
  }

  searchGetItems($event) {
    return;
  }

  getItems($event) {
    return;
  }

  selectCategory(event: MainCategory) {
    setTimeout(() => {
      console.log(event);
      this.slides.slideNext();
    }, 500);
  }
}
