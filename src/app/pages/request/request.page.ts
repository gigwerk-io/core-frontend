import {Component, EventEmitter, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {IonContent, IonSlides, ModalController} from '@ionic/angular';
import {MainCategory} from '../../utils/interfaces/main-marketplace/main-category';
import {TASK_CATEGORIES} from '../../utils/mocks/mock-categories.mock';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {MainMarketplaceTask} from '../../utils/interfaces/main-marketplace/main-marketplace-task';
import {State} from '../../utils/interfaces/locations/state';
import {STATES} from '../../utils/mocks/states.mock';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';

@Component({
  selector: 'request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss']
})
export class RequestPage implements OnInit {
  @Input() isModal = false;
  @ViewChild(IonSlides, {static: false}) slides: IonSlides;
  @ViewChild(IonContent, {static: false}) content: IonContent;

  taskRequest: MainMarketplaceTask = {
    category: undefined,
    complete_before: undefined,
    description: undefined,
    locations: [{
      street_address: undefined,
      city: undefined,
      state: undefined,
      zip: undefined,
    }],
    price: undefined,
  };

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
  states: State[] = STATES;

  constructor(private modalCtrl: ModalController, private photoLibrary: PhotoLibrary) { }

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

  selectCategory(category: MainCategory) {
    this.taskRequest.category = category.name;
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
            this.content.scrollToTop(500);
            break;
          case 1:
            this.pageTitle = 'Description';
            this.content.scrollToTop(500);
            break;
          case 2:
            this.pageTitle = 'Time';
            this.content.scrollToTop(500);
            break;
          case 3:
            this.pageTitle = 'Location';
            this.content.scrollToTop(500);
            break;
          case 4:
            this.pageTitle = 'Images';
            this.content.scrollToTop(500);
            break;
          case 5:
            this.pageTitle = 'Price';
            this.content.scrollToTop(500);
            break;
        }
      });
  }

  public onEditorChange( { editor }: ChangeEvent ) {
    const data = editor.getData();

    this.taskRequest.description = data;
  }

  setPrice(price: any) {
    this.taskRequest.price = price;
  }

  openPhotoGallery() {
    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.getLibrary().subscribe({
        next: library => {
          library.forEach(function(libraryItem) {
            console.log(libraryItem.id);          // ID of the photo
            console.log(libraryItem.photoURL);    // Cross-platform access to photo
            console.log(libraryItem.thumbnailURL); // Cross-platform access to thumbnail
            console.log(libraryItem.fileName);
            console.log(libraryItem.width);
            console.log(libraryItem.height);
            console.log(libraryItem.creationDate);
            console.log(libraryItem.latitude);
            console.log(libraryItem.longitude);
            console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
          });
        },
        error: err => { console.log('could not get photos'); },
        complete: () => { console.log('done getting photos'); }
      });
    })
    .catch(err => console.log('permissions weren\'t granted'));
  }
}
