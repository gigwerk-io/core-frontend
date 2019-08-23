import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonContent, IonSlides, ModalController} from '@ionic/angular';
import {MainCategory} from '../../utils/interfaces/main-marketplace/main-category';
import {TASK_CATEGORIES} from '../../utils/mocks/mock-categories.mock';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {MainMarketplaceTask} from '../../utils/interfaces/main-marketplace/main-marketplace-task';
import {State} from '../../utils/interfaces/locations/state';
import {STATES} from '../../utils/mocks/states.mock';
import {ImagePicker, ImagePickerOptions} from '@ionic-native/image-picker/ngx';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
  providers: [PhotoViewer]
})
export class RequestPage implements OnInit {
  @Input() isModal = false;
  @ViewChild(IonSlides, {static: false}) slides: IonSlides;
  @ViewChild(IonContent, {static: false}) content: IonContent;

  taskRequest: MainMarketplaceTask = {
    category_id: undefined,
    complete_before: undefined,
    description: undefined,
    intensity: undefined,
    locations: [{
      street_address: undefined,
      city: undefined,
      state: undefined,
      zip: undefined,
    }],
    price: undefined,
    image_one: undefined,
    image_two: undefined,
    image_three: undefined
  };

  minYear: number = (new Date()).getFullYear();
  maxYear: number = this.minYear + 1;

  imagesURI: any[];

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
  progress: number = 0;

  constructor(private modalCtrl: ModalController,
              private imagePicker: ImagePicker,
              private photoViewer: PhotoViewer) { }

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
            this.pageTitle = 'Difficulty';
            this.content.scrollToTop(500);
            break;
          case 6:
            this.pageTitle = 'Price';
            this.content.scrollToTop(500);
            break;
        }
      });
  }

  selectCategory(category: MainCategory) {
    this.taskRequest.category_id = category.id;
    setTimeout(() => {
      this.progress = 0.16;
      this.slides.slideNext();
    }, 500);
  }

  onEditorChange( { editor }: ChangeEvent ) {
    this.taskRequest.description = editor.getData();
    this.progress = 0.33;
  }

  setDatetime(datetime: any) {
    this.progress = 0.5;
    this.taskRequest.complete_before = datetime;
  }

  setStreetAddress(streetAddress: any) {
    this.progress = 0.54;
    this.taskRequest.locations[0].street_address = streetAddress;
  }

  setCity(city: any) {
    this.progress = 0.58;
    this.taskRequest.locations[0].city = city;
  }

  setState(state: any) {
    this.progress = 0.62;
    this.taskRequest.locations[0].state = state;
  }

  setZip(zip: any) {
    this.progress = 0.66;
    this.taskRequest.locations[0].zip = zip;
  }

  setImages() {
    this.progress = 0.74;
  }

  setDifficulty(intensity: string) {
    this.progress = 0.83;
    this.taskRequest.intensity = intensity;
    setTimeout(() => {
      this.slides.slideNext();
    }, 500);
  }

  setPrice(price: any) {
    this.progress = 1;
    this.taskRequest.price = price;
  }

  openPhotoGallery() {
    const options: ImagePickerOptions = {
      quality: 100,
      width: 600,
      height: 600,
      outputType: 1,
      maximumImagesCount: 3
    };

    this.imagePicker.getPictures(options).then((results) => {
      if (results[0]) {
        this.setImages();
        this.taskRequest.image_one = results[0];
      }

      if (results[1]) {
        this.taskRequest.image_two = results[1];
      }

      if (results[2]) {
        this.taskRequest.image_three = results[2];
      }
    }, (err) => { console.log('Error with Image Picker.'); });
  }

  removeImage(index: number) {
    switch (index) {
      case 0:
        this.taskRequest.image_one = undefined;
        break;
      case 1:
        this.taskRequest.image_two = undefined;
        break;
      case 2:
        this.taskRequest.image_three = undefined;
        break;
    }
  }
}
