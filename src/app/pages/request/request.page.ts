import {Component, EventEmitter, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {IonSlides, ModalController} from '@ionic/angular';
import {MainCategory} from '../../utils/interfaces/main-marketplace/main-category';
import {TASK_CATEGORIES} from '../../utils/mocks/mock-categories.mock';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  @Input() isModal = false;
  @ViewChild(IonSlides, {static: false}) slides: IonSlides;

  public Editor = ClassicEditor;
  editorConfig = {
    placeholder: 'Describe your task here.',
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote'
    ]
  };

  categories: MainCategory[] = TASK_CATEGORIES;
  pageTitle = 'Request';

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
      this.slides.slideNext();
    }, 500);
  }

  onSlideChange() {
    this.slides.getActiveIndex()
      .then((index) => {
        switch (index) {
          case 0:
            this.pageTitle = 'Request';
            break;
          case 1:
            this.pageTitle = 'Description';
            break;
          case 2:
            this.pageTitle = 'Price';
            break;
        }
      });
  }

  public onEditorChange( { editor }: ChangeEvent ) {
    const data = editor.getData();

    console.log('ckeditor -> ' + data );
  }
}
